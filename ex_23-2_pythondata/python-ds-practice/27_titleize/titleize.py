def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    titleized = f"{phrase[0].upper()}"
    rest = phrase[1::]
    space_trigger = False
    for char in rest:
        if char == " ":
            space_trigger = True
            titleized += char
        else:
            if space_trigger:
                titleized += char.upper()
                space_trigger = False
            else:
                titleized += char.lower()
                space_trigger = False
    return titleized