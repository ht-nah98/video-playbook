# Tạo whoosh/shimmer cho thư viện: python3 assets/sfx/synth.py → _synth/*.wav, rồi chuẩn hoá như README (cắt lặng, 48k, đỉnh −6 dBFS).
import os; os.makedirs("_synth", exist_ok=True)
import numpy as np, scipy.signal as ss, soundfile as sf
sr=48000; rng=np.random.default_rng(7)
def norm(x,db=-3): return x/np.abs(x).max()*10**(db/20)
def whoosh(dur, f0, f1, q=1.2, seed=0):
    r=np.random.default_rng(seed); n=int(dur*sr); x=r.standard_normal(n)
    t=np.linspace(0,1,n); env=np.sin(np.pi*t**0.7)**2   # soft swell, peak past middle
    fc=f0*(f1/f0)**t; y=np.zeros(n); blk=512; zi=None
    out=[]
    for i in range(0,n,blk):
        c=fc[min(i+blk//2,n-1)]; b,a=ss.butter(2,[c/q/(sr/2),min(c*q,sr/2.2)/(sr/2)],'band')
        seg,zi=ss.lfilter(b,a,x[i:i+blk],zi=zi if zi is not None else ss.lfilter_zi(b,a)*0)
        out.append(seg)
    y=np.concatenate(out)*env
    st=np.stack([y*np.linspace(1.0,0.6,n), y*np.linspace(0.6,1.0,n)],1)  # pan L->R
    return norm(st)
def shimmer(dur=1.2, seed=0):
    r=np.random.default_rng(seed); n=int(dur*sr); y=np.zeros((n,2))
    notes=[2093,2349,2637,3136,3520,4186,4699,5274]
    for k in range(14):
        t0=r.uniform(0,dur*0.45); f=r.choice(notes)*r.uniform(0.998,1.002); L=int((dur-t0)*sr); tt=np.arange(L)/sr
        tone=np.sin(2*np.pi*f*tt)*np.exp(-tt*r.uniform(4,8))*(1-np.exp(-tt*300))
        p=r.uniform(0.2,0.8); i=int(t0*sr); y[i:i+L,0]+=tone*(1-p); y[i:i+L,1]+=tone*p
    return norm(y)
for i,(d,a,b) in enumerate([(0.45,600,3500),(0.6,500,2800),(0.5,3000,700)]): sf.write(f'_synth/whoosh_short_{i+1}.wav',whoosh(d,a,b,seed=i),sr)
for i,(d,a,b) in enumerate([(1.0,250,1800),(1.2,1800,220)]): sf.write(f'_synth/whoosh_long_{i+1}.wav',whoosh(d,a,b,q=1.5,seed=10+i),sr)
for i in range(2): sf.write(f'_synth/shimmer_{i+1}.wav',shimmer(seed=i),sr)
print('ok')
# beep (pemdas): tiếng máy tính bỏ túi hiện kết quả — sine ngắn, vào/ra mềm, không nhoè
def beep(f, dur=0.09):
    tt=np.arange(int(dur*sr))/sr; y=np.sin(2*np.pi*f*tt)*np.minimum(1,tt/0.004)*np.minimum(1,(dur-tt)/0.02)
    return norm(np.stack([y,y],1))
for i,f in enumerate([2400,2000]): sf.write(f'_synth/beep_{i+1}.wav',beep(f),sr)
# flap (intuition): bảng số lật split-flap — chuỗi tiếng tách khô (nhiễu dải 1.5–6 kHz tắt 6 ms + "cộp" trầm), giãn dần
def flap(n=6, gap=0.032, seed=0):
    r=np.random.default_rng(seed); dur=n*gap*1.6+0.08; y=np.zeros((int(dur*sr),2)); t=0.0
    b,a=ss.butter(2,[1500/(sr/2),6000/(sr/2)],'band')
    for k in range(n):
        L=int(0.03*sr); tt=np.arange(L)/sr
        click=ss.lfilter(b,a,r.standard_normal(L))*np.exp(-tt/0.006)
        thunk=np.sin(2*np.pi*r.uniform(180,240)*tt)*np.exp(-tt/0.012)*0.35
        s=(click+thunk)*r.uniform(0.75,1.0); i=int(t*sr); p=r.uniform(0.35,0.65)
        y[i:i+L,0]+=s*(1-p); y[i:i+L,1]+=s*p; t+=gap*(1+0.12*k)
    return norm(y)
for i,(n,g) in enumerate([(6,0.030),(4,0.036),(9,0.026)]): sf.write(f'_synth/flap_{i+1}.wav',flap(n,g,seed=20+i),sr)
# buzzer (intuition): còi SAI kiểu game show — hai răng cưa lệch 6 Hz, lọc thấp, 0.55 s, vào/ra gọn
def buzzer(f=104, dur=0.55):
    tt=np.arange(int(dur*sr))/sr; x=ss.sawtooth(2*np.pi*f*tt)+ss.sawtooth(2*np.pi*(f+6)*tt)
    b,a=ss.butter(3,1800/(sr/2)); y=ss.lfilter(b,a,x)*np.minimum(1,tt/0.01)*np.minimum(1,(dur-tt)/0.04)
    return norm(np.stack([y,y],1))
for i,(f,d) in enumerate([(104,0.55),(92,0.7)]): sf.write(f'_synth/buzzer_{i+1}.wav',buzzer(f,d),sr)
