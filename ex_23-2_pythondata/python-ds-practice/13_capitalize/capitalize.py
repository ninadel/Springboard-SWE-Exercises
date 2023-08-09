def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    first = phrase[0]
    rest = phrase[1::]
    return first.upper() + rest