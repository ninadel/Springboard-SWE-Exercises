"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        """Create a serial generator"""
        self.start = start
        self.num = start

    def generate(self):
        """Get the current number value and increment"""
        generated_num = self.num
        self.num += 1
        return generated_num

    def reset(self):
        """Set number to the original start number"""
        self.num = self.start        
