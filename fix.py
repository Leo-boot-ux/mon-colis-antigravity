import re

with open('src/services/demo.service.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('"heavy"', '"gros_colis"')
text = text.replace("'heavy'", "'gros_colis'")
text = text.replace('"box"', '"moyen_colis"')
text = text.replace("'box'", "'moyen_colis'")
text = text.replace('"airtel_money"', '"mobile_money"')
text = text.replace("'airtel_money'", "'mobile_money'")
text = text.replace('"moov_money"', '"mobile_money"')
text = text.replace("'moov_money'", "'mobile_money'")

text = re.sub(r'street:\s*.*?, city:\s*(.*?), latitude:\s*.*?, longitude:\s*.*? }', r'\1', text)
text = re.sub(r'status:\s*(.*?), createdAt:', r'status: \1, createdBy: "system", createdAt:', text)
text = re.sub(r'read:\s*(.*?), type:\s*(.*?), createdAt:', r'read: \1, type: \2, channel: "web", createdAt:', text)

with open('src/services/demo.service.ts', 'w', encoding='utf-8') as f:
    f.write(text)
