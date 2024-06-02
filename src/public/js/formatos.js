/*
    Funciones para el 
    Función que devuelve el formato numérico de moneda mientras se escribe un número.
    format(dato_string):

    Función que convierte un dato string en número:
    Por desarrollar.
*/

function format(input)
    {
        var num = input.value.replace(/\./g,'');
        if(!isNaN(num)){
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/,'');
            input.value = num;
        }
        else{ alert('Solo se permiten numeros');
            input.value = input.value.replace(/[^\d\.]*/g,'');
        }
}