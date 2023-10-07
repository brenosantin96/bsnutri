export const capitalizeFourthLetter = (str: string): string => {
    if (str.length < 4) {
      // Verifica se a string tem pelo menos 4 caracteres
      return str;
    }
  
    // Obtém a quarta letra da string
    const fourthLetter = str.charAt(3);
  
    // Converte a quarta letra para maiúscula
    const capitalizedFourthLetter = fourthLetter.toUpperCase();
  
    // Substitui a quarta letra original pela versão em maiúscula na string
    const result = str.slice(0, 3) + capitalizedFourthLetter + str.slice(4);
  
    return result;
  }
  
  
  export const replaceDashWithSlash = (inputString: string): string => {
    // Utilizamos o método replace com uma expressão regular (regex) para substituir todas as ocorrências do símbolo "-" pelo símbolo "/"
    const modifiedString = inputString.replace(/-/g, '/');
    return modifiedString;
  };
  

  