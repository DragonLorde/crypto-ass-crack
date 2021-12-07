const randomUseragent = require('random-useragent');
const request = require('request')

//логин и пароль проксей
let user = 'uA8hi9YW'
let password = '4iDfukzK'

//масив с прокси
let proxys = [
  '91.188.215.127:50986', 
  '194.156.116.102:59881',  
  '176.119.143.39:62524',  
  '212.60.7.22:49010',  
  '45.92.172.224:58844',  
  '213.226.103.160:56535',  
  '45.149.129.157:48479',  
  '94.154.189.147:47676',  
  '91.188.228.142:62247',  
  '45.146.231.35:56013',  
  '45.147.13.83:64703' 
]

let lastProx = [proxys[0], proxys[1], proxys[2]];
    
function getProxy(){
  let prox = proxys[getRandomInt(0, proxys.length)];
  while(lastProx.includes(prox)){
        prox = proxys[getRandomInt(0, proxys.length)];
  }
  lastProx.shift();
  lastProx.push(prox);
  return prox;
}
    
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//регистрация или получение информации 
async function Registration(email) {
    await sleep(2000)
    let proxyUrl = "http://" + user + ":" + password + '@' + getProxy();

    console.log(proxyUrl)

    let json = {
        email: email,
    }
  
    let url = 'https://leads.kickofflabs.com/lead/155411';
    let headers = {
        'User-Agent': randomUseragent.getRandom()
    };

    return new Promise(function(resolve, reject) {
      request.post({
        url: url, 
        headers: headers,
        proxy: proxyUrl,
        json: json,
        strictSSL: false
      }, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
}

async function RegistrationMaster(email) {
  await sleep(2000)
  let proxyUrl = "http://" + user + ":" + password + '@' + getProxy();

  console.log(proxyUrl)

  let json = {
      email: email,
  }

  let url = 'https://leads.kickofflabs.com/lead/155411';
  let headers = {
      'User-Agent': randomUseragent.getRandom()
  };

  return new Promise(function(resolve, reject) {
    request.post({
      url: url, 
      headers: headers,
      proxy: proxyUrl,
      json: json,
      strictSSL: false
    }, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve([body,proxyUrl]);
      }
    })
  })
}

//Подтверждение почты
async function ConfirmEmail(id) {
  let proxyUrl = "http://" + user + ":" + password + '@' + getProxy();

    let url = `https://app.kickofflabs.com/verify-email?c=155411&t=9931de3386e828ab300c&s=${id}`;
    let headers = {
        'User-Agent': randomUseragent.getRandom()
    };

    return new Promise(function(resolve, reject) {
      request.get({
        url: url, 
        headers: headers,
        proxy: proxyUrl,
        strictSSL: false
      }, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
}
//Выполнение заданий
async function RandTask(kidUser) {
  let proxyUrl = "http://" + user + ":" + password + '@' + getProxy();

    let count = 5 //randomInteger(4 , 4)

    let arrTask = [
        108375,
        109967,
        108285,
        108379,
        108380
    ]
    shuffle(arrTask)

    let url = 'https://leads.kickofflabs.com/action/155411';

    for (let index = 0; index < count; index++) {
        let headers = {
            'User-Agent': randomUseragent.getRandom()
        };
        let json = {
            aid:arrTask[index],
            kid:kidUser,
            data:{}
        }
        request.post({ 
            url: url, 
            headers: headers,
            proxy: proxyUrl,
            json: json,
            strictSSL: false
        }, //запрос
        function (e, r, body) {
            //console.log(r.body)
        })//
    }

    return count

}
//Добавление рефералов
async function AddKid(email , index, emailArr) {
    let respArr = await RegistrationMaster(email)
    let resp = respArr[0]
    let kid = resp.social_id

    await sleep(3000)
    //проврека на верификацию
    if(resp.verified == false) {
      console.log('verifi')
      await ConfirmEmail(resp.id)
    }
    await sleep(3000)
    //цикл для регистрации рефиралов
    let ind = index
    if(resp.contest_score < 40) {
      for(let i = 0; i < 5; i++) {
        
        if(emailArr[ind] != undefined) {
          ind = ind + 1
          await _RegistrationKid(emailArr[ind], kid)
        }
        await sleep(8000)
      }
    }
    //возвращаем на каком индексе остановился цикл регистрации рефиреалов
    return [ind , respArr[1]]
}
//задержка
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
//рандом
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
//перемещать масив
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
//регистрация пользователей
async function _RegistrationKid(email2, kidUser) {
  let proxyUrl = "http://" + user + ":" + password + '@' + getProxy();
  console.log(kidUser + ' line 155')
  console.log(email2 + ' line 156')
  let json = {
        email: email2,
      __kid:kidUser
  }

  let url = 'https://leads.kickofflabs.com/lead/155411';
  let headers = {
      'User-Agent': randomUseragent.getRandom(),
  };

  return new Promise(function(resolve, reject) {
    request.post({
      url: url, 
      headers: headers,
      proxy: proxyUrl,
      json: json,
      strictSSL: false
    }, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        console.log(body)
        resolve(body);
      }
    })
  })
}
//не используется
function GetRandMail(mailArr, n, index) {
  mailArr.splice(index , 1)
  //console.log(mailArr)

  const sample = mailArr
  .map(x => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(a => a.x)
  .slice(0, n);

  sample.find((el, index) => {
    let ln =  mailArr.length
    for(let i = 0; i < ln; i++) {
      if(el == mailArr[i]) {
        mailArr.splice(i , 1)
      }
    }
  })
  return [mailArr , sample]
}
//экспорт модулей
module.exports = {
  getBody:Registration,
  Registration:ConfirmEmail,
  RandTask:RandTask,
  AddKid:AddKid
}