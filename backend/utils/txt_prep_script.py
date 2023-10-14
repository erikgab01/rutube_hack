import re

import nltk
from nltk.corpus import stopwords

from pymystem3 import Mystem


class TextPreparator:
    def __init__(self):
        self.m = Mystem()
        self.stopwords = None
        self.setup()

    def setup(self):
        nltk.download('stopwords')
        self.stopwords = stopwords.words("russian")

    def clear_text(self, text: str) -> str:
        t = re.sub(r'[^а-яА-ЯёЁ ]', ' ', text)
        t = ' '.join(t.split())
        return t

    def lemmatize_text(self, text: str) -> str:
        remove_words = []
        tokens = self.m.lemmatize(text.lower())
        tokens = [token for token in tokens if token != '\n']
        text = " ".join(tokens)
        text = re.sub(r'\b\w{1,4}\b', '', text).split()
        for i in text:
            if i[-1] == 'ь' or i[-2:] in ['ий', 'ый', 'ой', 'ся']:
                remove_words.append(i)
        for i in remove_words:
            text.remove(i)
        text = ' '.join(text)

        return text

    def delete_garbage(self, string: str) -> str:
        string = string.split()
        for i in self.stopwords:
            if i in string:
                string.remove(i)
        return ' '.join(string)

    def process_single_text(self, raw_text: str) -> str:
        clear_text = self.clear_text(raw_text).lower()
        lemm_text = self.lemmatize_text(clear_text)
        lemm_clear_text = self.delete_garbage(lemm_text)

        return lemm_clear_text

    def write_to_file(self, text: str, file_path: str) -> None:
        with open(file_path, 'a') as f:
            f.write(text + ' ')


if __name__ == "__main__":
    tp = TextPreparator()
    txt = "В этой серии Легенда ворк-аута Антон Протеинов познакомит вас с новыми мышцами в человеческом организме, научит приседать, отжиматься и любить Россию."
    clr_text = tp.process_single_text(txt)
    print(clr_text)
    tp.write_to_file(clr_text, 'file.txt')
