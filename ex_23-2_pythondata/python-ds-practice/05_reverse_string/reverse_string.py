def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    new_string = ""
    char_to_copy = -1
    for i in range(len(phrase)):
        new_string+=phrase[char_to_copy]
        char_to_copy -= 1
    return new_string


