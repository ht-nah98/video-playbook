"""Kênh + đăng nhập YouTube — dùng chung cho mọi công cụ tools/yt/ và tools/i18n/push.py.

Kênh = mọi channels/<ch>/channel.json có "youtube_id" (thêm kênh: tạo thư mục mới, không sửa code).
Token mỗi kênh: ~/.config/mascot-mv/youtube-token-<ch>.json (600, ngoài repo). Từ chối lưu token nếu tài khoản chọn ở
trang Google không phải kênh <ch> (so youtube_id). API chỉ nhận chủ kênh / Brand Account Manager, KHÔNG nhận quyền
Manager trong Studio (docs/analytics/DATA.md §5).
"""
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
CONF = pathlib.Path.home() / '.config' / 'mascot-mv'
SECRET = CONF / 'client_secret.json'
SCOPES = ['https://www.googleapis.com/auth/youtube',
          'https://www.googleapis.com/auth/youtube.force-ssl',  # captions API không nhận quyền youtube thường
          'https://www.googleapis.com/auth/yt-analytics.readonly']


def channel_conf(ch):
    return json.loads((ROOT / 'channels' / ch / 'channel.json').read_text())


CHANNELS = sorted(f.parent.name for f in (ROOT / 'channels').glob('*/channel.json')
                  if 'youtube_id' in json.loads(f.read_text()))


def has_token(ch):
    return (CONF / f'youtube-token-{ch}.json').exists()


def video_map(ch, shorts=False):
    """channels/<ch>/videos.json: {id video dài: projects/<p>} — điền tay khi đăng bài (title trên YouTube hay đổi).
    shorts=True gộp thêm channels/<ch>/shorts.json (Short → bài, tools/yt/map_shorts.py). push.py dùng bản không Shorts."""
    out = {}
    for name in ('videos.json',) + (('shorts.json',) if shorts else ()):
        f = ROOT / 'channels' / ch / name
        if f.exists():
            out.update(json.loads(f.read_text()))
    return out


def want_id(ch):
    return channel_conf(ch)['youtube_id']


def channel_of(c):
    from googleapiclient.discovery import build
    items = build('youtube', 'v3', credentials=c, cache_discovery=False).channels().list(
        part='snippet', mine=True).execute().get('items') or [{}]
    return items[0].get('id'), items[0].get('snippet', {}).get('title')


def creds(ch, interactive=True):
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    if not SECRET.exists():
        sys.exit(f'Thiếu {SECRET} — làm theo docs/lesson/YOUTUBE-API-SETUP.pdf')
    tok = CONF / f'youtube-token-{ch}.json'
    c = Credentials.from_authorized_user_file(str(tok)) if tok.exists() else None  # giữ quyền đã cấp của token: đòi thêm khi refresh sẽ lỗi invalid_scope
    if c and c.expired and c.refresh_token:
        try:
            c.refresh(Request())
        except Exception:  # app Testing: refresh token hết hạn sau 7 ngày → đăng nhập lại
            c = None
    if not c or not c.valid:
        if not interactive:  # cron / chạy nền: không mở trình duyệt — báo để người dùng đăng nhập lại
            raise RuntimeError(f'token kênh {ch} hết hạn hoặc chưa có — chạy: stats.py --ch {ch} --login')
        # select_account: Google luôn hiện bảng chọn (không tự lấy lại tài khoản đã cấp quyền lần trước)
        c = InstalledAppFlow.from_client_secrets_file(str(SECRET), SCOPES).run_local_server(
            port=0, prompt='select_account consent')
        (got, title), want = channel_of(c), want_id(ch)
        if got != want:  # so theo ID (tên hiển thị có thể khác channel.json, vd. "scartch")
            sys.exit(f'Đã chọn kênh "{title}" ({got}), cần {want} — KHÔNG lưu token. Chạy lại; '
                     'kênh brand account là một mục RIÊNG trong bảng chọn của Google.')
        tok.write_text(c.to_json()); tok.chmod(0o600)
    return c


def relogin(ch):
    """Đăng nhập lại để token nhận đủ SCOPES hiện tại; token cũ giữ nguyên nếu chọn sai kênh."""
    from google_auth_oauthlib.flow import InstalledAppFlow
    c = InstalledAppFlow.from_client_secrets_file(str(SECRET), SCOPES).run_local_server(port=0, prompt='select_account consent')
    (got, title), want = channel_of(c), want_id(ch)
    if got != want:
        sys.exit(f'Đã chọn kênh "{title}" ({got}), cần {want} — KHÔNG lưu token.')
    tok = CONF / f'youtube-token-{ch}.json'
    tok.write_text(c.to_json()); tok.chmod(0o600)
    return c


REMOTE_REDIRECT = 'http://localhost:8790/'  # trang chủ kênh thấy "không mở được" — họ copy địa chỉ đó gửi lại


def remote_start(ch):
    """Cấp quyền từ xa (chủ kênh ở máy khác — Manager trong Studio KHÔNG dùng được API, LESSONS §140).
    In link cho chủ kênh; lưu state + PKCE verifier (600) để remote_finish đổi mã. Mã hết hạn ~10 phút."""
    from google_auth_oauthlib.flow import Flow
    flow = Flow.from_client_secrets_file(str(SECRET), SCOPES, redirect_uri=REMOTE_REDIRECT)
    url, state = flow.authorization_url(access_type='offline', prompt='select_account consent', include_granted_scopes='false')
    pend = CONF / f'remote-{ch}.json'
    pend.write_text(json.dumps({'state': state, 'verifier': flow.code_verifier})); pend.chmod(0o600)
    return url


def remote_finish(ch, response_url):
    """Đổi địa chỉ localhost chủ kênh gửi về thành token; chỉ lưu nếu đúng youtube_id của kênh <ch>."""
    import os
    from google_auth_oauthlib.flow import Flow
    pend = CONF / f'remote-{ch}.json'
    if not pend.exists():
        sys.exit(f'Chưa có link đang chờ cho kênh {ch} — chạy --remote trước.')
    p = json.loads(pend.read_text())
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'  # redirect là http://localhost (chỉ để đọc mã trong URL)
    flow = Flow.from_client_secrets_file(str(SECRET), SCOPES, redirect_uri=REMOTE_REDIRECT, state=p['state'], code_verifier=p['verifier'])
    flow.fetch_token(authorization_response=response_url.strip())
    c = flow.credentials
    (got, title), want = channel_of(c), want_id(ch)
    if got != want:
        sys.exit(f'Tài khoản đã cấp quyền là kênh "{title}" ({got}), cần {want} — KHÔNG lưu token.')
    tok = CONF / f'youtube-token-{ch}.json'
    tok.write_text(c.to_json()); tok.chmod(0o600)
    pend.unlink()
    return title


def clients(ch, interactive=True):
    from googleapiclient.discovery import build
    c = creds(ch, interactive)
    return (build('youtube', 'v3', credentials=c, cache_discovery=False),
            build('youtubeAnalytics', 'v2', credentials=c, cache_discovery=False))
