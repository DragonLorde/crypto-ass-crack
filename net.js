const { log } = require("console");
const req = require('./core/req.js')
const email = require('./core/email.js')

//старт программы
async function Start(comand) {
    let emailArr = await email.getFile()
    await UserFetch(emailArr , comand)
}

//вызов основных фукнций и проерка 
async function UserFetch(emailArr , comand) {

    //проврека количиства мыл
    if( emailArr.length < 6) {
        console.log("Слишком мало емайлов для выполнения запроса , минимум 6")
        return
    }

    //выбор метода для выполнения
    switch (comand) {
        case 'reg__kid':
            await KidMake(emailArr)
            break;
        case 'verifi':
            await Verifi(emailArr)
            break;
        default:
            console.log('no comand')
            return
            break;
    }
}

//верификация почт
async function Verifi(emailArr) {
    for(let i = 0; i < emailArr.length; i++) {
        let resp = await req.getBody(emailArr[i])

        if(resp.verified == false) {
            console.log('verifi')
            await sleep(8000)
            await req.Registration(resp.id)
        }
        await sleep(5000)

        let countEvent = resp.completed_actions.length
        if(countEvent < 3) {
            await sleep(5000)
            req.RandTask(resp.social_id)
        }
        await sleep(2000)
    }
}
//регистрация рефералов
async function KidMake(emailArr) {
    for(let i = 0; i < emailArr.length; i++) {
        let dataMaster = await req.AddKid(emailArr[i] , i, emailArr)
        email.fileAppend(`${emailArr[i]} - ip: ${dataMaster[1]}`)
        i = i + dataMaster[0]
        console.log(dataMaster[0])
        await sleep(3000)
    } 
}
//задержка
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

//reg__kid - регистрация рефиралов
//verifi - верификация аккаунтов

Start('verifi')
