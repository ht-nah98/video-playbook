# Ghi bản dịch title + mô tả cho YouTube Studio > Languages; đo giới hạn (title ≤ 100 ký tự, mô tả ≤ 5000 byte UTF-8, cấm < >)
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from channel import out_dir
LANGS = [('es', 'Spanish'), ('pt-BR', 'Portuguese (Brazil)'), ('hi', 'Hindi'), ('id', 'Indonesian'), ('de', 'German'),
         ('fr', 'French'), ('ar', 'Arabic'), ('vi', 'Vietnamese'), ('tr', 'Turkish'), ('ko', 'Korean')]
def chapters(stamps, names):
    assert len(stamps) == len(names), (len(stamps), len(names))
    return '\n'.join(f'{s} {n}' for s, n in zip(stamps, names))
def write(p, data):
    d = pathlib.Path(out_dir(p)) / 'youtube' / 'languages'; d.mkdir(parents=True, exist_ok=True)
    bad = 0
    for i, (code, name) in enumerate(LANGS, 1):
        title, desc = data[code]; desc = desc.strip()
        tl, db = len(title), len(desc.encode('utf-8'))
        ok = tl <= 100 and db <= 5000 and not any(c in title + desc for c in '<>')
        bad += not ok
        (d / f'{i:02d}-{code}.txt').write_text(
            f'Studio > Languages > Add language: {name}\n\n===== TITLE ({tl}/100) =====\n{title}\n\n'
            f'===== DESCRIPTION ({len(desc)} ký tự, {db}/5000 byte) =====\n{desc}\n')
        print(f'{p:15} {code:6} title {tl:3}  desc {db:5} B  {"OK" if ok else "!! VƯỢT"}')
    return bad

C = {
 'es': dict(sub='Video en inglés: activa los subtítulos (CC) y elige español en la traducción automática.',
            ch='Capítulos', inv='En este video',
            outro='99% from scratch: las grandes ideas de las matemáticas, construidas desde cero. Suscríbete para no perderte la próxima lección.'),
 'pt-BR': dict(sub='Vídeo em inglês: ative as legendas (CC) e escolha português na tradução automática.',
            ch='Capítulos', inv='Neste vídeo',
            outro='99% from scratch: as grandes ideias da matemática, construídas do zero. Inscreva-se para não perder a próxima aula.'),
 'hi': dict(sub='वीडियो अंग्रेज़ी में है: सबटाइटल (CC) चालू करें और ऑटो-ट्रांसलेट में हिंदी चुनें।',
            ch='अध्याय', inv='इस वीडियो में',
            outro='99% from scratch: गणित के बड़े विचार, बिल्कुल शुरुआत से। अगला पाठ न छूटे, इसलिए सब्सक्राइब करें।'),
 'id': dict(sub='Video berbahasa Inggris: nyalakan subtitle (CC) lalu pilih terjemahan otomatis ke Bahasa Indonesia.',
            ch='Bab', inv='Di video ini',
            outro='99% from scratch: ide-ide besar matematika, dibangun dari nol. Subscribe supaya tidak ketinggalan pelajaran berikutnya.'),
 'de': dict(sub='Das Video ist auf Englisch: Untertitel (CC) einschalten und bei „Automatisch übersetzen“ Deutsch wählen.',
            ch='Kapitel', inv='In diesem Video',
            outro='99% from scratch: die großen Ideen der Mathematik, von Grund auf aufgebaut. Abonniere, damit du die nächste Lektion nicht verpasst.'),
 'fr': dict(sub='Vidéo en anglais : activez les sous-titres (CC) puis choisissez le français dans la traduction automatique.',
            ch='Chapitres', inv='Dans cette vidéo',
            outro='99% from scratch : les grandes idées des mathématiques, construites à partir de zéro. Abonnez-vous pour ne pas manquer la prochaine leçon.'),
 'ar': dict(sub='الفيديو باللغة الإنجليزية: فعّل الترجمة (CC) واختر العربية من الترجمة التلقائية.',
            ch='الفصول', inv='في هذا الفيديو',
            outro='99% from scratch: الأفكار الكبرى في الرياضيات، نبنيها من الصفر. اشترك حتى لا يفوتك الدرس القادم.'),
 'vi': dict(sub='Video tiếng Anh: bật phụ đề (CC) rồi chọn Tự động dịch sang tiếng Việt.',
            ch='Chương', inv='Trong video này',
            outro='99% from scratch: những ý tưởng lớn của toán học, xây lên từ con số 0. Đăng ký kênh để không bỏ lỡ bài tiếp theo.'),
 'tr': dict(sub='Video İngilizce: altyazıları (CC) açın ve otomatik çeviriden Türkçe’yi seçin.',
            ch='Bölümler', inv='Bu videoda',
            outro='99% from scratch: matematiğin büyük fikirleri, sıfırdan inşa ediliyor. Bir sonraki dersi kaçırmamak için abone olun.'),
 'ko': dict(sub='영어 영상입니다. 자막(CC)을 켜고 자동 번역에서 한국어를 선택하세요.',
            ch='챕터', inv='이 영상에서 다루는 내용',
            outro='99% from scratch: 수학의 큰 아이디어를 처음부터 차근차근 쌓아 올립니다. 다음 강의를 놓치지 않으려면 구독하세요.'),
}
def desc(code, intro, stamps, names, bullets, extra, tags, credits):
    c = C[code]
    parts = [intro.strip(), c['sub'], c['ch'] + '\n' + chapters(stamps, names),
             c['inv'] + '\n' + '\n'.join('- ' + b for b in bullets)]
    parts += [e for e in extra if e] + [c['outro'], tags, credits]
    return '\n\n'.join(parts)
