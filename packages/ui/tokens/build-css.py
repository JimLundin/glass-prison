import json,sys,re
t=json.load(open(sys.argv[1]))
def al(v): 
    m=re.fullmatch(r'\{(.+)\}',v); return f'var(--{m.group(1)})' if m else v
L=[];D=[]
for x in t['color']['tokens']+t['shadow']['tokens']:
    v=x['value']
    if isinstance(v,str): L.append(f"--{x['name']}:{al(v)};")
    else:
        L.append(f"--{x['name']}:{al(v['light'])};")
        if 'dark' in v: D.append(f"--{x['name']}:{al(v['dark'])};")
R=[f"--{x['name']}:{x['value']};" for k in ('spacing','radius','material','layout') for x in t[k]['tokens']]
R+=[f"--font-{k}:{v};" for k,v in t['type']['families'].items()]
cls=[]
for g in t['type']['groups']:
    for s in g['styles']:
        cls.append(f".{s['name']}{{font-family:var(--font-{g['family']});font-size:{s['fontSize']};line-height:{s['lineHeight']};font-weight:{s['fontWeight']};letter-spacing:{s['letterSpacing']}}}")
print(':root,[data-theme="light"]{'+''.join(L)+'}\n[data-theme="dark"]{'+''.join(D)+'}\n:root{'+''.join(R)+'}\n'+'\n'.join(cls))
