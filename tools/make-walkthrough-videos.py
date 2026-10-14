"""Build the walkthrough clips in assets/video: eased zoom and pan over a 2x screen capture, fading captions, seamless 12 s loop.
Usage: python3 tools/make-walkthrough-videos.py assets/video <captures-dir> <Outfit-600.ttf> <Outfit-500.ttf> [clip ...]
Captures: the product build (reference/product/managem-app.html) at 1440x900 and 2x device scale, one PNG per screen
(enquiries, quote, projects, stock, invoices, sage). Fonts: static instances of the Outfit variable font at weights 600
and 500, made with fontTools instancer from assets/fonts/outfit-latin-wght.woff2. Output files are named walk-<clip>.mp4."""
import subprocess, sys, os
SRC=sys.argv[2].rstrip('/')+'/'
FONT=sys.argv[3]
FONT5=sys.argv[4]
OUT=sys.argv[1]; FPS=30; W,H=1440,900; IW,IH=2880,1800

def ease_expr(t):  # smoothstep on a 0..1 expression string
    return f"(({t})*({t})*(3-2*({t})))"

def piecewise(keys, idx):
    """keys: list of (time, z, cx, cy). Returns an ffmpeg expression in terms of 'on' (frame) for component idx (1=z,2=cx,3=cy)."""
    expr=None
    for (t0,*a),(t1,*b) in zip(keys, keys[1:]):
        f0,f1=t0*FPS,t1*FPS; v0,v1=a[idx-1],b[idx-1]
        t=f"(on-{f0})/({f1}-{f0})"; e=ease_expr(f"min(max({t},0),1)")
        seg=f"({v0}+({v1}-{v0})*{e})"
        expr = seg if expr is None else f"if(lt(on,{f0}),{expr},{seg})"
    return expr

def caption(text, eyebrow, a, b, y=None):
    y = y if y is not None else H-170
    al=f"if(lt(t,{a}),0,if(lt(t,{a+.45}),(t-{a})/.45,if(lt(t,{b-.45}),1,if(lt(t,{b}),({b}-t)/.45,0))))"
    txt=text.replace("'", "’").replace(':','\\:')
    eb=eyebrow.replace(':','\\:')
    parts=[
      f"drawtext=fontfile={FONT}:text='{txt}':fontsize=40:fontcolor=white:x=72:y={y}:box=1:boxcolor=0x0B1222@0.88:boxborderw=22:alpha='{al}'",
      f"drawtext=fontfile={FONT5}:text='{eb}':fontsize=20:fontcolor=0x5EEAD4:x=72:y={y-62}:box=1:boxcolor=0x0B1222@0.88:boxborderw=10:alpha='{al}'",
    ]
    return parts

def build(name, keys, caps, dur=12):
    frames=dur*FPS
    z=piecewise(keys,1); cx=piecewise(keys,2); cy=piecewise(keys,3)
    zp=(f"zoompan=z='{z}':x='({cx})-(iw/({z}))/2':y='({cy})-(ih/({z}))/2':d={frames}:s={W}x{H}:fps={FPS}")
    chain=[zp,"format=yuv420p"]
    for c in caps: chain+=caption(*c)
    vf=",".join(chain)
    cmd=["ffmpeg","-y","-hide_banner","-loglevel","error","-loop","1","-i",SRC+name+".png","-t",str(dur),"-vf",vf,
         "-c:v","libx264","-preset","slow","-crf","25","-pix_fmt","yuv420p","-movflags","+faststart","-an",OUT+"/walk-"+name+".mp4"]
    subprocess.run(cmd,check=True)
    print("wrote",name, os.path.getsize(OUT+"/walk-"+name+".mp4")//1024,"KB")

C=(1.0,1440,900)
clips={
 'enquiries': ([(0,*C),(1.6,1.08,1480,900),(2.4,1.3,1620,520),(5.2,1.3,1620,520),(6.2,1.85,1650,1150),(9.2,1.85,1650,1150),(10.6,*C),(12,*C)],
   [("Every enquiry in one pipeline, by stage","SALES PIPELINE",2.2,5.4),("Customer, area, type, status and sales rep on every lead","OPEN ENQUIRIES",6.0,9.4)]),
 'quote': ([(0,*C),(1.6,1.08,1440,940),(2.4,1.9,1310,1250),(5.2,1.9,1310,1250),(6.2,2.3,2420,1150),(9.2,2.3,2420,1150),(10.6,*C),(12,*C)],
   [("Line items from your product list, VAT and totals done for you","QUOTE",2.2,5.4),("Send to the customer, or create the invoice from the quote","QUICK ACTIONS",6.0,9.4)]),
 'projects': ([(0,*C),(1.6,1.08,1480,900),(2.4,1.75,1650,1030),(5.2,1.75,1650,1030),(6.2,2.4,2400,1030),(9.2,2.4,2400,1030),(10.6,*C),(12,*C)],
   [("Every job with its customer, foreman, dates and progress","CURRENT JOBS",2.2,5.4),("See which jobs are on track and which are late","PROGRESS",6.0,9.4)]),
 'stock': ([(0,*C),(1.6,1.08,1480,900),(2.4,1.3,1620,560),(4.8,1.3,1620,560),(5.6,2.0,1050,1000),(8.0,2.0,1050,1000),(8.8,2.1,2200,1580),(10.4,2.1,2200,1580),(11.3,*C),(12,*C)],
   [("Stock value, low-stock items and open purchase orders","STOCK CONTROL",2.2,5.0),("Receive, dispatch, transfer, return and stock take","MOVEMENTS",5.5,8.2),("Low-stock alerts before the shelf is empty","ALERTS",8.7,10.6)]),
 'invoices': ([(0,*C),(1.6,1.08,1480,900),(2.4,1.3,1620,520),(5.2,1.3,1620,520),(6.2,2.0,2250,1200),(9.2,2.0,2250,1200),(10.6,*C),(12,*C)],
   [("Billed, paid, outstanding and overdue at the top","INVOICES",2.2,5.4),("Paid, partial, unpaid or overdue on every invoice","STATUS",6.0,9.4)]),
 'sage': ([(0,*C),(1.6,1.08,1480,900),(2.4,2.4,2400,220),(4.8,2.4,2400,220),(5.6,1.3,1620,560),(8.0,1.3,1620,560),(8.8,2.0,2250,1250),(10.6,2.0,2250,1250),(11.3,*C),(12,*C)],
   [("Connected to Sage Accounting","SAGE",2.2,5.0),("Synced, pending and errors in one view","SYNC STATUS",5.5,8.2),("Each invoice posts with its net, VAT and total","POSTED",8.7,10.8)]),
}
only=sys.argv[5:] or list(clips)
for n in only: build(n,*clips[n])
