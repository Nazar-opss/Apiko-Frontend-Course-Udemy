const helloInLang = {
    en: 'Hello World!',
    es: '!Hola mundo!',
    ua: 'Привіт, світ!'
};

const byeInLang = {
    en: 'Bye',
    es: '!Hola mundo!',
    ua: 'Допобачення'
};

//export 
        const greeting = {
    sayHello: function(lang) {
        return helloInLang[lang]
    }
};

//export
        const goodbye = {
    sayGoodBye: function(lang) {
        return byeInLang[lang]
    }
};

//or

export {
    greeting,
    goodbye
}

