def print_upper_words(words, must_start_with={}):
    """Prints words in uppercase if they start with a letter in a set"""
    for word in words:
        for letter in must_start_with:
            if word.lower()[0] == letter.lower()[0]:
                print(word.upper())

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})
# this should print "HELLO", "HEY", "YO", and "YES"
