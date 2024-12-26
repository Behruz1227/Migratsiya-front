export function lotinToKirill(text: string): string {
    const mapping: Record<string, string> = {
      "A": "А", "B": "Б", "D": "Д", "E": "Е", "F": "Ф", "G": "Г", 
      "H": "Ҳ", "I": "И", "J": "Ж", "K": "К", "L": "Л", "M": "М", 
      "N": "Н", "O": "О", "P": "П", "Q": "Қ", "R": "Р", "S": "С", 
      "T": "Т", "U": "У", "V": "В", "X": "Х", "Y": "Й", "Z": "З", 
      "O‘": "Ў", "G‘": "Ғ", "SH": "Ш", "CH": "Ч", "YO": "Ё", "YU": "Ю", 
      "YA": "Я", "E’": "Э", "TS": "Ц"
    };
  
    const sortedKeys = Object.keys(mapping).sort((a, b) => b.length - a.length);
  
    let result = text.toUpperCase(); // Butun matnni katta harflarga o'zgartirish
    sortedKeys.forEach((key) => {
      const regex = new RegExp(key, 'g');
      result = result.replace(regex, mapping[key]);
    });
  
    return result;
  }
  