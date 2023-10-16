import re

import nltk
from nltk.corpus import stopwords

from pymystem3 import Mystem
from translate import Translator

class TextPreparator:
    def __init__(self):
        self.m = Mystem()
        self.stopwords = None
        self.setup()

    def setup(self):
        self.translator = Translator(from_lang='ru', to_lang="en")
        nltk.download('stopwords')
        self.stopwords = stopwords.words("russian")
        garbage_words = ['подписываться', 'также', 'канал', 'комментарий', 'который', 'просмотр', 'сегодня']
        for i in garbage_words:
            self.stopwords.append(i)

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
            if i[-1] == 'ь': #or i[-2:] in ['ий', 'ый', 'ой', 'ся']
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

    def get_top_eng_words(self, file_path: str, top_amount: int = 5) -> str:
        count_dict = {}
        with open(file_path, "r") as f:
            text = f.readlines()
        text = text[0]

        for i in text.split():
            if i in count_dict:
                count_dict[i] += 1
            else:
                count_dict[i] = 1

        sorted_words = sorted(count_dict.items(), key=lambda item: item[1], reverse=True)

        top = []
        for i in range(top_amount):
            top.append(sorted_words[i][0])
        top = ' '.join(top)

        eng_words = self.translator.translate(top)
        return eng_words


if __name__ == "__main__":
    tp = TextPreparator()
    txt = "В этой серии Легенда ворк-аута Антон Протеинов познакомит вас с новыми мышцами в человеческом организме, научит приседать, отжиматься и любить Россию."
    clr_text = tp.process_single_text(txt)
    print(clr_text)

    # tp.write_to_file(clr_text, 'file.txt')
    top_eng_words = tp.get_top_eng_words('file_txt')
    print(top_eng_words)
