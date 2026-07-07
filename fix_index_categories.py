import re
import pathlib
p = pathlib.Path(r'c:\Users\User\OneDrive\Desktop\Tours\index.html')
text = p.read_text('utf-8')
pattern = re.compile(
    r'(<div class="col-lg-4 col-md-6 col-sm-12 mb-4">)(.*?<h2 class="card-title mb-2">)([^<]+)(</h2>)',
    re.S,
)

def cat_for_title(title):
    title = title.strip()
    if title in [
        'Masai Mara National Reserve',
        'Amboseli National Park',
        'Nairobi National Reserve',
        'Tsavo National Reserve',
    ]:
        return 'national-park'
    if title == 'Lake Nakuru National Park':
        return 'lake-river'
    if title == 'Mount Kenya':
        return 'mountain-hill'
    if title == 'Diani Beach':
        return 'coast-island'
    return 'hidden-gem'


def repl(m):
    start, before_title, title, end = m.groups()
    if 'data-category=' in start:
        return m.group(0)
    category = cat_for_title(title)
    return start.replace('mb-4">', f'mb-4" data-category="{category}">') + before_title + title + end

new_text = pattern.sub(repl, text)
if new_text != text:
    p.write_text(new_text, 'utf-8')
    print('updated')
else:
    print('not updated')
