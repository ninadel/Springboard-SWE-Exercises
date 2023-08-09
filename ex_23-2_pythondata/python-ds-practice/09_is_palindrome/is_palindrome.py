def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    testStr = phrase.lower().replace(" ","")
    countdown = round(len(testStr))
    char_i = 0
    while countdown >= 0:
        if testStr[char_i] != testStr[len(testStr)-char_i-1]:
            return False
        countdown -= 1
    return True

