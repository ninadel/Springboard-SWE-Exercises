from random import choice
"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    def __init__(self, path):
        """Create a word list from a text file"""
        self.wordlist = self.get_words(path)

    def __repr__(self):
        return f"{self.wordlist}"

    def get_words(self, path):
        """Open the text file and create the word list"""
        wordlist = []
        file = open(path)
        for line in file:
            word = line.replace("\n", "")
            wordlist.append(word)
        file.close()
        print(f"{len(wordlist)} words read")
        return wordlist

    def random(self):
        """Get a random word form the word list"""
        return choice(self.wordlist)
        

class SpecialWordFinder(WordFinder):
    def __init__(self, path):
        """Create a word list from a text file"""
        self.wordlist = self.get_words(path)

    def get_words(self, path):
        """Open the text file and create the word list"""
        wordlist = []
        file = open(path)
        for line in file:
            strip = line.replace("\n", "")
            if len(strip) > 0:
                if strip[0].isalpha():
                    wordlist.append(strip)
        file.close()
        print(f"{len(wordlist)} words read")
        return wordlist