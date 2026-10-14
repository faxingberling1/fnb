import re, json

with open(r'C:\Users\Arsalan Abbas\.gemini\antigravity-ide\brain\0fac1571-3b88-490f-9022-01949a0119c1\.system_generated\steps\49\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

pos = 0
while True:
    start = text.find('<script type="application/ld+json">', pos)
    if start == -1:
        break
    end = text.find('</script>', start)
    if end == -1:
        break
    s = text[start + len('<script type="application/ld+json">'):end]
    try:
        data = json.loads(s)
        print("FOUND SCHEMA:", data.get('@type'))
        with open('schema_packages.json', 'w', encoding='utf-8') as sf:
            json.dump(data, sf, indent=2)
    except Exception as e:
        print("JSON parse error:", e)
    pos = end + 9

# Also search for package definitions in the next data chunk
next_chunks = re.findall(r'(\{"id":\s*"(?:foundation|standard|executive|bestseller)[^}]+\})', text, re.IGNORECASE)
print("Next data chunks count:", len(next_chunks))
for c in next_chunks[:5]:
    print("Chunk:", c[:200])
