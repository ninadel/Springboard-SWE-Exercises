def print_upper_words(words, must_start_with={}):
    """Prints words in uppercase if they start with a letter in the set"""
    for word in words:
        print(word)


    # this should print "HELLO", "HEY", "YO", and "YES"

# print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
#                    must_start_with={"h", "y"})

print_upper_words(["hi", "hi", "ho"])