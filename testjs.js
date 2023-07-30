const request = require('request');
const schedule = require('node-schedule');
const H5guard = require('./mt.js');



// mtgsig: '{"a1":"1.1","a2":1687593240686,"a3":"785393zz5x6954y8zz7z3vuv14132z2u811x635vu0z9795873y8xy6w","a5":"SRoLINmsqkU7SuerzJvG/1LcAQX/Y9WD","a6":"h1.3QdMIEyVWaMSp5jGm51J+g27204spPjMbkASybwLO021LvoLAjt0FGBxeyi6R8AXeKzjRHSoEC6x9oaStBw3qR5DYd/74faawbtS/vToZgovyAR/rrvxjZF+gNnr6/wHRLwwxbniRwTuYrKCJ8eRSgHUSmqzX9LpM6Hpg3ysKMkW6qL7HKtFut61jMcRQqsykuq8GT3YwpGQTSY+qv4E4GoKQIkg51WqMUCNfke5U4BAFlfUUUYSw6FiwSwDCaKTycnx6ZQjVL2uFn8GCvB452WnIrpCWel+E5YvzLntIWiajnWk1gUjFLd0zE1Lk50ps4ERpet1J3VMB4FASiauIcw==","x0":4,"d1":"58c5550e7b4bbc23182a124b238ee92f"}',
// data: '{"cType":"wx_wallet","fpPlatform":13,"wxOpenId":"","appVersion":"","mtFingerprint":"H5dfp_2.0.0_tttt_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"}'

const Cookie = [
  {
    token: 'userId=2203598989&token=AgGEJItVsamhxson14htkw6xoDeijZGTqw3rxGF45udKKG6WNO_M7OULP1dxWC62RMnc95MIumf6vQAAAAB7GQAAXgDTbqmHI6N424I81vkNCuqhXLXkTgf-OMrp5SY1KhLnQYc-8Xe_qgCHOseNvb2e',
    ck: '_lxsdk_cuid=1893e963828c8-011dfd4172ddd8-4c052c4b-56d10-1893e963828c8; _lxsdk=1893e963828c8-011dfd4172ddd8-4c052c4b-56d10-1893e963828c8; ta.uuid=1678297089102295063; isUuidUnion=true; iuuid=1893e963828c8-011dfd4172ddd8-4c052c4b-56d10-1893e963828c8; WEBDFPID=z2u1zv913uzu5w2503yyu67031u551u88106v035xu697958633976vw-2004332184629-1688972184629CUCKGASe67dcc3e61b3db1bf3f9e3b1c7aaaa889830; uuid=8da52694e5214804ab7d.1688972185.1.0.0; mt_c_token=AgGEJItVsamhxson14htkw6xoDeijZGTqw3rxGF45udKKG6WNO_M7OULP1dxWC62RMnc95MIumf6vQAAAAB7GQAAXgDTbqmHI6N424I81vkNCuqhXLXkTgf-OMrp5SY1KhLnQYc-8Xe_qgCHOseNvb2e; thirdlogin_token=AgGEJItVsamhxson14htkw6xoDeijZGTqw3rxGF45udKKG6WNO_M7OULP1dxWC62RMnc95MIumf6vQAAAAB7GQAAXgDTbqmHI6N424I81vkNCuqhXLXkTgf-OMrp5SY1KhLnQYc-8Xe_qgCHOseNvb2e; oops=AgGEJItVsamhxson14htkw6xoDeijZGTqw3rxGF45udKKG6WNO_M7OULP1dxWC62RMnc95MIumf6vQAAAAB7GQAAXgDTbqmHI6N424I81vkNCuqhXLXkTgf-OMrp5SY1KhLnQYc-8Xe_qgCHOseNvb2e; userId=2203598989; u=2203598989; isid=AgGEJItVsamhxson14htkw6xoDeijZGTqw3rxGF45udKKG6WNO_M7OULP1dxWC62RMnc95MIumf6vQAAAAB7GQAAXgDTbqmHI6N424I81vkNCuqhXLXkTgf-OMrp5SY1KhLnQYc-8Xe_qgCHOseNvb2e; _lx_utm=utm_source%3Dwxshare; _lxsdk_s=18972592362-7b-803-3b%7C%7C14',
    name: '小夏',
  },
  {
    token: 'userId=1865448579&token=AgHbIdq_l72pMmqv4tXYVm5OhU_EkRkYX441CQs6tDzbKZ4a1_gMtVT0EmTYtwsthXkHU28AZxTWYgAAAADHGQAAXXvmxjT6O_Iy6rmHZP6jfcnBhcDMMTINCvgk2OMTPGKMAFzKR1OkvbTiU0KZvBSf',
    ck: 'WEBDFPID=44231231234wwqe32141fs;userId=1865448579;token=AgHbIdq_l72pMmqv4tXYVm5OhU_EkRkYX441CQs6tDzbKZ4a1_gMtVT0EmTYtwsthXkHU28AZxTWYgAAAADHGQAAXXvmxjT6O_Iy6rmHZP6jfcnBhcDMMTINCvgk2OMTPGKMAFzKR1OkvbTiU0KZvBSf',
    name: '老白',
  },
  {
    token: 'userId=3220060943&token=AgGQILrGvsx2vWvjzJXh8f5uCr29HD6VVXVSIry7RSA31H6aaYTJlbUjNfrJAbgISskqcXvdiKma0gAAAAARGQAAWwMAKw1pAO1d-qSarKpHZRXmlZC2fP0Ha_t4jx4g64CKciOyTiNEBTbRyuRQDcGG;',
    ck: '_lxsdk_cuid=188c365130dc8-07551ebfa61218-4d062c4f-56d10-188c365130ec8; _lxsdk=188c365130dc8-07551ebfa61218-4d062c4f-56d10-188c365130ec8; ta.uuid=1669628153402220625; isUuidUnion=true; iuuid=188c365130dc8-07551ebfa61218-4d062c4f-56d10-188c365130ec8; WEBDFPID=785393zz5x6954y8zz7z3vuv14132z2u811x635vu0z9795873y8xy6w-2002265369756-1686905369756EGEMOSIe67dcc3e61b3db1bf3f9e3b1c7aaaa882395; uuid=62ef717681df4771be1f.1686905352.1.0.0; token=AgGQILrGvsx2vWvjzJXh8f5uCr29HD6VVXVSIry7RSA31H6aaYTJlbUjNfrJAbgISskqcXvdiKma0gAAAAARGQAAWwMAKw1pAO1d-qSarKpHZRXmlZC2fP0Ha_t4jx4g64CKciOyTiNEBTbRyuRQDcGG; mt_c_token=AgGQILrGvsx2vWvjzJXh8f5uCr29HD6VVXVSIry7RSA31H6aaYTJlbUjNfrJAbgISskqcXvdiKma0gAAAAARGQAAWwMAKw1pAO1d-qSarKpHZRXmlZC2fP0Ha_t4jx4g64CKciOyTiNEBTbRyuRQDcGG; oops=AgGQILrGvsx2vWvjzJXh8f5uCr29HD6VVXVSIry7RSA31H6aaYTJlbUjNfrJAbgISskqcXvdiKma0gAAAAARGQAAWwMAKw1pAO1d-qSarKpHZRXmlZC2fP0Ha_t4jx4g64CKciOyTiNEBTbRyuRQDcGG; userId=3220060943; u=3220060943; isid=AgGQILrGvsx2vWvjzJXh8f5uCr29HD6VVXVSIry7RSA31H6aaYTJlbUjNfrJAbgISskqcXvdiKma0gAAAAARGQAAWwMAKw1pAO1d-qSarKpHZRXmlZC2fP0Ha_t4jx4g64CKciOyTiNEBTbRyuRQDcGG; _lxsdk_s=188c3651312-f16-083-976%7C%7C47',
    name: '啊光',
  },
  {
    token: 'userId=2885390884&token=AgH1IPDDdUdRoluuZl8OzFaYL_m__3OgGvAe8AkRi2gpZqCc4pU-GioAPbPtEQyUdPvg9RTs4tVN_AAAAADHGQAA2x2MVqR6OZ_Pq4LGe0sOIj51lAsGV1QHZw4Y0Iz85Bw6SgrZ8YR-F0C2--0TlqSt',
    ck: 'WEBDFPID=5224158458643822116532;userId=2885390884;token=AgH1IPDDdUdRoluuZl8OzFaYL_m__3OgGvAe8AkRi2gpZqCc4pU-GioAPbPtEQyUdPvg9RTs4tVN_AAAAADHGQAA2x2MVqR6OZ_Pq4LGe0sOIj51lAsGV1QHZw4Y0Iz85Bw6SgrZ8YR-F0C2--0TlqSt',
    name: '小满',
  },
  {
    token: 'userId=253827531&token=AgFNI2wkSBjA69qTDex6W-Yu-n-D3d9JF_LJAbwB8Z3xGrx3zdxPjNOgb6P0-oB2JyTYLq8ji_IqTgAAAAARGQAA-DmD0z2u4tv76-ATQbWiMg0PvpU77mciCgo-elSz87Q-RUEgbUGJrhXUnafhofzl;',
    ck: '_lxsdk_cuid=188e83b68f9c8-0387026498c428-4c052c4b-56d10-188e83b68fac8; _lxsdk=188e83b68f9c8-0387026498c428-4c052c4b-56d10-188e83b68fac8; ta.uuid=1672220417945272348; isUuidUnion=true; iuuid=188e83b68f9c8-0387026498c428-4c052c4b-56d10-188e83b68fac8; WEBDFPID=w2uwy2u61vuy5y72076y3v96u819uw2v811v16y2u6w97958y0732511-2002883391545-1687523391545WYQIWMAe67dcc3e61b3db1bf3f9e3b1c7aaaa881908; uuid=f10524ae59974cce9da8.1687523393.1.0.0; token=AgFNI2wkSBjA69qTDex6W-Yu-n-D3d9JF_LJAbwB8Z3xGrx3zdxPjNOgb6P0-oB2JyTYLq8ji_IqTgAAAAARGQAA-DmD0z2u4tv76-ATQbWiMg0PvpU77mciCgo-elSz87Q-RUEgbUGJrhXUnafhofzl; mt_c_token=AgFNI2wkSBjA69qTDex6W-Yu-n-D3d9JF_LJAbwB8Z3xGrx3zdxPjNOgb6P0-oB2JyTYLq8ji_IqTgAAAAARGQAA-DmD0z2u4tv76-ATQbWiMg0PvpU77mciCgo-elSz87Q-RUEgbUGJrhXUnafhofzl; oops=AgFNI2wkSBjA69qTDex6W-Yu-n-D3d9JF_LJAbwB8Z3xGrx3zdxPjNOgb6P0-oB2JyTYLq8ji_IqTgAAAAARGQAA-DmD0z2u4tv76-ATQbWiMg0PvpU77mciCgo-elSz87Q-RUEgbUGJrhXUnafhofzl; userId=253827531; u=253827531; isid=AgFNI2wkSBjA69qTDex6W-Yu-n-D3d9JF_LJAbwB8Z3xGrx3zdxPjNOgb6P0-oB2JyTYLq8ji_IqTgAAAAARGQAA-DmD0z2u4tv76-ATQbWiMg0PvpU77mciCgo-elSz87Q-RUEgbUGJrhXUnafhofzl; _lxsdk_s=188e83b68fe-3ea-3eb-07d%7C%7C271',
    name: '小布',
  },
  {
    token: 'userId=1896059122&token=AgFAJoSI_CmRzT34WpwmmO5V3y6plcXDRR6CAZ9SeQB2hkXKpv8iuFt-n3X2wfXVs4LP1Ay0mMDLHQAAAAAtGAAAWjuqbQq6zAGP3QTGjY2aRADDP6H84fzYOEFisHlcruyVxAJJrz848PDo4uCGoheO;',
    ck: 'WEBDFPID=12225485229954543;userId=1896059122;token=AgFAJoSI_CmRzT34WpwmmO5V3y6plcXDRR6CAZ9SeQB2hkXKpv8iuFt-n3X2wfXVs4LP1Ay0mMDLHQAAAAAtGAAAWjuqbQq6zAGP3QTGjY2aRADDP6H84fzYOEFisHlcruyVxAJJrz848PDo4uCGoheO;',
    name: '啊宽',
  },
  {
    token: 'userId=1876315549&token=AgGtJEtEFtgoR36ugOj0KaiErq5iu7Vd_55tTKskeiDrVmUqZXpYnQa2RcTjdeq7fX0bU2Jvr7xJiwAAAADHGQAA_RTt9CB3VdjK1yyClnkzO42ICk_6kKAIj9N9kb3rI5_PN1frvTw5Kya3rvRJ_0H0',
    ck: 'WEBDFPID=9127912315237824;userId=1876315549;token=AgGtJEtEFtgoR36ugOj0KaiErq5iu7Vd_55tTKskeiDrVmUqZXpYnQa2RcTjdeq7fX0bU2Jvr7xJiwAAAADHGQAA_RTt9CB3VdjK1yyClnkzO42ICk_6kKAIj9N9kb3rI5_PN1frvTw5Kya3rvRJ_0H0',
    name: '啊宝'
  },
  {
    token: 'userId=1576947950&token=AgH8H9-7IOItJcwxrIx8y7coaULK0ACystWcP-IC4UulNbhxa_3jVj2_D5PxmU_DVqFY3gELTuaVMQAAAADHGQAAX1zFhEccWgGDJyJ0Yft0baRs5CONN6ZXYpNpqYa4zokb3-TKqAU9FIN2J5ixME41',
    ck: 'WEBDFPID=54767548946432333;userId=1576947950;token=AgH8H9-7IOItJcwxrIx8y7coaULK0ACystWcP-IC4UulNbhxa_3jVj2_D5PxmU_DVqFY3gELTuaVMQAAAADHGQAAX1zFhEccWgGDJyJ0Yft0baRs5CONN6ZXYpNpqYa4zokb3-TKqAU9FIN2J5ixME41',
    name: '啊农'
  },
  {
    token: 'userId=3942223901&token=AgG9IafOBFXQF43g6OSWPc4xo8TqHFni4Lr-ggUP9KfKAX7w0mnLcN8ZNOpIxAFz5pVdEvsOURb92gAAAACpGQAATL4WPXRYrt1TFtYfr2bcVyYMNXPuLWbHeyw3_ybXrVsB2FO9S5tKx1JK0f5rm3bT',
    ck: 'WEBDFPID=2412426885234221;userId=3942223901;token=AgG9IafOBFXQF43g6OSWPc4xo8TqHFni4Lr-ggUP9KfKAX7w0mnLcN8ZNOpIxAFz5pVdEvsOURb92gAAAACpGQAATL4WPXRYrt1TFtYfr2bcVyYMNXPuLWbHeyw3_ybXrVsB2FO9S5tKx1JK0f5rm3bT',
    name: '啊健'
  },
  {
    token: 'userId=2225803279&token=AgE4HQAnFqICO8qKgBYDpjG57MRrzPe74H6No5ZGpz4m-4K2saOutgBIRn6C1ye9H2Ui545oPypCOwAAAADHGQAAA2JFXaMF8uM8BSeiJlEErVxrdf40PmsGRX5ELq_P7sY3_Jc5nnIhxh9vgtLHQBoK',
    ck: 'WEBDFPID=6457523243253465;userId=2225803279;token=AgE4HQAnFqICO8qKgBYDpjG57MRrzPe74H6No5ZGpz4m-4K2saOutgBIRn6C1ye9H2Ui545oPypCOwAAAADHGQAAA2JFXaMF8uM8BSeiJlEErVxrdf40PmsGRX5ELq_P7sY3_Jc5nnIhxh9vgtLHQBoK',
    name: '无情'
  },
  {
    token: 'userId=3581328956&token=AgG0I_78zBbJXS9Fw7tPhdwJvXxuQ2Hl2F_YjblWlFL2QhM-7yItPrYz2E4Ua98GQ7Jokyt8yykw9AAAAADHGQAAWqgaF3rr8Nw4uu6C29SdxvEtfiWvj6KXhCdbMNFyqp_C7Od6_FhtkkJkvYZGRTBu',
    ck: 'WEBDFPID=432546344532432;userId=3581328956;token=AgG0I_78zBbJXS9Fw7tPhdwJvXxuQ2Hl2F_YjblWlFL2QhM-7yItPrYz2E4Ua98GQ7Jokyt8yykw9AAAAADHGQAAWqgaF3rr8Nw4uu6C29SdxvEtfiWvj6KXhCdbMNFyqp_C7Od6_FhtkkJkvYZGRTBu',
    name: '司马'
  },
  {
    token: 'userId=2203598989&token=AgE1HwN3l7qRTp_ocNH_zAAxJ7D_QhSaIAwnNANzcfmJSlw7zjTiZ1knJl9dbTO-URx36UeLUrSB0AAAAADHGQAATgE2hyNoEyvphOJkSbI42_kuvPJtNlIDqjyUTdtFgWHBDtJFbzkeYcCWGXPTVM9E',
    ck: 'WEBDFPID=2642645134672574;userId=2203598989;token=AgE1HwN3l7qRTp_ocNH_zAAxJ7D_QhSaIAwnNANzcfmJSlw7zjTiZ1knJl9dbTO-URx36UeLUrSB0AAAAADHGQAATgE2hyNoEyvphOJkSbI42_kuvPJtNlIDqjyUTdtFgWHBDtJFbzkeYcCWGXPTVM9E',
    name: '啊坤'
  },
  // {
  //   token: 'token=AgFjI0s3xN9WQ3ImMxZmQJRk1bXBesqR8cc6qDqOWPMc-K08TADoId51vYVr2exVgQpm1p-bJhPXLgAAAAAVGQAAzle8asR8deGoRYLbAzpyHFrzNLTkKGBrvPkg0Z3smXfLadElhuo7VU2BfTdoyDWA;',
  //   ck: 'WEBDFPID=941v065y00z15z7z0y63vw4w1vw28z57811wv41y00z9795813zv8z60-2002717536179-1687357536179WEAOQASe67dcc3e61b3db1bf3f9e3b1c7aaaa884111;token=AgFjI0s3xN9WQ3ImMxZmQJRk1bXBesqR8cc6qDqOWPMc-K08TADoId51vYVr2exVgQpm1p-bJhPXLgAAAAAVGQAAzle8asR8deGoRYLbAzpyHFrzNLTkKGBrvPkg0Z3smXfLadElhuo7VU2BfTdoyDWA;',
  //   name: '妖友22340'
  // },
  // {
  //   token: 'token=AgGgJmJcjhe4S3a2cDeDZ5NIUybh4liEeaiDj1UKZRq-bQvoKZIV2v2nioqtZmInwXAPVPlfxT8stAAAAACpGQAAaMye4t9LFxLEhQ1iwitJuIX86js_5tr23eF2pRVsIaKg-vDH8OYvoK5oSpOuP7rV',
  //   ck: 'WEBDFPID=5235344575485221242352353212;token=AgGgJmJcjhe4S3a2cDeDZ5NIUybh4liEeaiDj1UKZRq-bQvoKZIV2v2nioqtZmInwXAPVPlfxT8stAAAAACpGQAAaMye4t9LFxLEhQ1iwitJuIX86js_5tr23eF2pRVsIaKg-vDH8OYvoK5oSpOuP7rV',
  //   name: '妖友45024'
  // }
]

let data = {
  "cType": "mti", "fpPlatform": 3, "wxOpenId": "", "appVersion": ""
};
const ua = 'Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.82 Mobile Safari/537.36 MicroMessenger/8.0.2.1840(0x2800023B) NetType/WIFI Language/zh_CN';


/*
  https://promotion.waimai.meituan.com/lottery/limitcouponcomponent/info?couponReferIds=

  1.  25-12（每天，有效期3小时）
  10:30
  419967B3A4064140BA78E6A046DF0FC1
  15:00
  687D57731F804A2CAE1F455331F83524

  2.  30-15 & 40-15 （每天，有效期3小时）
  (30-15)10:00
  DBFA760914E34AFF9D8B158A7BC4D706
  (30-15)16:00
  F6CFF2A35BD94F49BDEE0CC6F7CF9FE4
  (40-15)10:00
  1A83C143E0C74AF08FC57294BAE5943F
  (40-15)16:00
  20FDD25F8EBD4D9BA1C8FFEC52641486

  15:00
  D5FB79FFF0A6495FBD3563CDE0A7096D
  # 15点   30-15  96ED3F5E94434D9280FB201FE66315C3 
  # 17点   30-15  9E5277BC958F4AD192F9EECED4A51D90
  5.  25-13膨胀 （周三，有效期一天）
  10:30
  00B223429B424F7A910C0D4885957E99
  17:30
  246AB38ABAE24C15BF599D4BD412ED46

*/
var content = [];

let Request = function (params, Cookie, contentIndex) {
  return new Promise((resolve, reject) => {
    const url = 'https://promotion.waimai.meituan.com/lottery/limitcouponcomponent/fetchcoupon?couponReferId=' + params.couponId +
      '&actualLng=110.373609&actualLat=25.281683&geoType=2&gdPageId=' + params.gdPageId + '&pageId=' + params.pageId +
      '&version=' + params.version + '&utmSource=' + params.utmSource + '&utmCampaign=' + params.utmCampaign + '&instanceId=' + params.instanceId +
      '&componentId=' + params.componentId + '&' + Cookie.token + '&yodaReady=' + params.yodaReady + '&csecplatform=' + params.csecplatform + "&csecversion=" + params.csecversion;
    // const data = Cookie.data;
    const data = {
      "cType": "wx_wallet", "fpPlatform": 13, "wxOpenId": "", "appVersion": "", "mtFingerprint": Cookie.data
    };
    const headers = {
      'mtgsig': Cookie.mtgsig,
      // 'mtgsig': '{"a1":"1.1","a2":1689494819923,"a3":"z2u1zv913uzu5w2503yyu67031u551u88106v035xu697958633976vw","a5":"+wXZURTwKBa1ioW6IQOCv+dfahq86XXMwW==","a6":"h1.3SKl2KoeSQ9BQ+CMNxqWSO76eNWmfkeQWou4D/DvwgTm4vDOkzaMR6fujWL0baWeAaPQ6/eNOkYChVviZePI3SloTOkwEkeEDg8Dn6r0ahAx2oPoBTg287fUA/m9ElnwLsRpLRBLAQ6hM0B2/dULmBYctQwfpxdVxuzmzMf5lS4UNF6UQj0fXDw13OaIIpxM4LRwW4w3+g0jbar1NwCd1a9Owb28avNqCs8FSZO8VhDciBIGAPiBK7Exda0vQqnphvHMqjJcfHYL8kzeHTIETRK6xWWoKuJ6R1qCBwarvnbNcvimIvaN7tSMXjL1RtqLPip+QBT13mEWugXDovP49bQ==","x0":4,"d1":"f785aec85deb8300cd03c92daa6e2dc3"}',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.82 Mobile Safari/537.36 MicroMessenger/8.0.2.1840(0x2800023B) NetType/WIFI Language/zh_CN',
      'Content-Type': 'application/json',
      'Origin': 'https://market.waimai.meituan.com',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Referer': 'https://market.waimai.meituan.com/',
      'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'Host': 'promotion.waimai.meituan.com',
      'Connection': 'keep-alive',
      'X-Requested-With': 'com.tencent.mm',
      'Content-Length': JSON.stringify(data).length,
      // Cookie: Cookie.ck,
    };
    const req = {
      url,
      method: 'post',
      headers,
      body: data,
      json: true,
    };
    let date = new Date();
    let dateStr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + '点' + date.getMinutes() + '分' + date.getSeconds() + '秒' + date.getMilliseconds()
    request(
      req
      , (err, response, data) => {
        if (err) console.log(err);
        console.log(params.type + '：  ' + dateStr);
        console.log(Cookie.name + '：', data.msg);
        content[contentIndex] += Cookie.name + '：' + data.msg + '\n';
        console.log('--------------------------------------------');
        if (data.msg === '已领取' || data.msg === '抢券成功！' || data.msg === '已获得该券' || data.msg === "来晚了，券抢完了~") {
          resolve('ok');
        }
      })
  })
};


let loadCoupon = function (couponId, token) {
  return new Promise((resolve, reject) => {
    let url = 'https://promotion.waimai.meituan.com/lottery/limitcouponcomponent/info?couponReferIds=' + couponId + '&' + token;
    request({
      url,
      method: 'get',
    }, (err, response, data) => {
      if (err) {
        console.log(err);
      }
      else {
        resolve(data);
      }
    })
  })
}

//  25-12 同一个couponID不同时间不同页面的参数
//  gdpageid 512946
//  pageId 515613
//  componentId 16887175844450.5464210622892272

// gdPageId=500039
// pageId=516245
// componentId=16890426447450.2400622600627338

// 7-14秒没 可以试试新的
// const params = {
//   couponId: '419967B3A4064140BA78E6A046DF0FC1',
//   gdPageId: '379391',
//   pageId: '378925',
//   utmSource: '',
//   utmCampaign: '',
//   version: '1',
//   instanceId: '16619982800580.30892480633143027',
//   componentId: '16619982800580.30892480633143027',
//   yodaReady: 'h5',
//   csecplatform: '4',
//   csecversion: '2.0.1',
//   type: '25-12',
//   time: '11',
// };

// ！！！！！！！！！！！！！！！！！！
// 这个11点可以抢！！！美团设置出问题了
// 还有一个十点半的不知道行不行  --7.19
// ！！！！！！！！！！！！！！！！！！
// const params = {
//   couponId: '687D57731F804A2CAE1F455331F83524',
//   gdPageId: '512946',
//   pageId: '515613',
//   utmSource: '',
//   utmCampaign: '',
//   version: '1',
//   instanceId: '16887175844450.5464210622892272',
//   componentId: '16887175844450.5464210622892272',
//   yodaReady: 'h5',
//   csecplatform: '4',
//   csecversion: '2.0.1',
//   type: '25-12',
//   time: '17点',
// };

// const params = {
//   couponId: '419967B3A4064140BA78E6A046DF0FC1',
//   gdPageId: '500039',
//   pageId: '516245',
//   utmSource: '',
//   utmCampaign: '',
//   version: '1',
//   instanceId: '16890426447450.2400622600627338',
//   componentId: '16890426447450.2400622600627338',
//   yodaReady: 'h5',
//   csecplatform: '4',
//   csecversion: '2.0.1',
//   type: '25-12',
//   time: '11点',
// };

// const params = {
//   couponId: 'F6CFF2A35BD94F49BDEE0CC6F7CF9FE4',
//   gdPageId: '306477',
//   pageId: '306004',
//   instanceId: '16620226080900.11717750606071209',
//   componentId: '16620226080900.11717750606071209',
//   version: '1',
//   utmSource: '',
//   utmCampaign: '',
//   yodaReady: 'h5',
//   csecplatform: '4',
//   csecversion: '2.0.1',
//   type: '30-15',
//   time: '16点'
// };

// const params = {
//   couponId: '00B223429B424F7A910C0D4885957E99',
//   gdPageId: '379397',
//   pageId: '378931',
//   instanceId: '16618616100670.97030510386642830',
//   componentId: '16618616100670.97030510386642830',
//   version: '',
//   utmSource: '',
//   utmCampaign: '',
//   yodaReady: 'h5',
//   csecplatform: '4',
//   csecversion: '2.0.1',
//   type: '25-13',
//   time: '17.30'
// };


// ！！！！！！！！测试任务 
// 尝试着用苹果抓包 抢两次看看是否有效果！（记得屏蔽这里的账号！）

// 测试结果
// 如果单ck抢 抓包白号 一天可以一直抢
// 但是苹果抓包重发 也是只能抢一次 再重新发包就是异常（可能是浏览器环境问题）
// 苹果抓包抢完一次之后可以再这里再抢一次

// 如果一个号抓四遍 然后给四个号用 同样也是异常一整天 
// 但是不知道为什么 如果让别人抢的话就不会异常 - -!
// 别人无非就是指纹不一样 但是为什么我换了指纹还是异常呢！问题就很大

// 同时抓两个号 给两个ck分别使用
// 有号主的指纹的时候 用号主指纹账号的异常 号主成功

// 比较奇怪 我vmos上面登录了两个号
// 第一次抓一个号 用上全部ck 除了我的号之外都能抢(某一个号，总共五个)
// 第二次抓另一个号 除了登录的那两个号之外都！不！能抢

// 今天就更奇怪了 本来以为一个指纹只能抢4个号
// 所以今天就删掉一个留四个号 但是只有两个是成功了的 
// 不知道问题出现在哪里了= =!

// 一个号抓一次 然后给四个号用 有两个不中（然后上号领取就领取成功）
// 另一个号抓一次 给两个号用 全中
// 首先排除号的问题 那应该就是nodejs发请求的问题了 应该不是指纹的问题
// 可是问题出在哪里啊 我人麻了

// 应该是黑设备了 现在测试
// 小夏的号 用了阿光的指纹 抢了早上两个25-12
// 啊光跟老白的号 用了小夏的指纹 抢了一个25-12
// 然后下午的30-15 先更改 啊光设备的设备信息 然后再抓 再重新给大家伙抢看看能不能成功
// 如果可以成功 问题应该不大
// 下午30-15用啊光的指纹 改了设备信息 全部异常 除了啊光和啊宽两个号....
// 然后更改设备信息 更改分辨率 重新抓一次 依旧全部异常
// 重新更改设备信息 改手机号码 序列号等参数 电脑更换ip 依旧全部异常
// 用小夏的设备 重新抓 除了小夏其他全部异常
// 用小夏的设备重新抓 只给小满用！ （单ck调用） 依旧异常

// 下午17.30还有一张 25-13 也可以试一下更改小夏设备的设备信息 看看情况
// 既然跟设备信息有关 那么更换设备应该没什么大问题 可以看看 但是不能改 屏幕的宽高啊（暂时不考虑
console.log('test')
// async function getFinger() {
//   for (let i = 0; i < Cookie.length; i++) {
//     const fullUrl = 'test';
//     const h5guard = new H5guard(Cookie[i].ck, ua);
//     let res = await h5guard.sign(fullUrl, data);
//     Cookie[i].data = res.mtFingerprint;
//     Cookie[i].mtgsig = res.mtgsig;
//   }
//   console.log(Cookie);
// }
// getFinger();
// console.log('test1')

function test(params, contentIndex) {
  content[contentIndex] = '';
  console.log(`Cookie数：${Cookie.length}; 正在给ck生成指纹...`);
  new Promise(async (resolve, reject) => {
    for (let i = 0; i < Cookie.length; i++) {
      const fullUrl = 'test';
      const h5guard = new H5guard(Cookie[i].ck, ua);
      let res = await h5guard.sign(fullUrl, data);
      Cookie[i].data = res.mtFingerprint;
      Cookie[i].mtgsig = res.mtgsig;
    }
    resolve('ok');
  }).then(() => {
    console.log('指纹生成完毕...');
    console.log('开始抢券...');
    console.log('--------------------------------------------');
    let allPromise = [];
    let allPromise2 = [];
    let intervalNum = [];
    let allInterval = [];
    Cookie.map((item, index) => {
      allPromise[index] = loadCoupon(params.couponId, item.token);
    })
    Promise.all(allPromise).then(data => {
      console.log('生成优惠券链接...');
      console.log(data);
      console.log('--------------------------------------------');
      // 这里有误差 误差在1000ms以内！！！！！！！！！！！！！！
      let time = 59 - new Date().getSeconds();
      console.log('离开抢时间还剩：' + time + '秒');
      console.log('--------------------------------------------');
      setTimeout(() => {
        Cookie.map((item, index) => {
          intervalNum[index] = 0;
          allPromise2[index] = new Promise((resolve1, reject) => {
            allInterval[index] = setInterval(() => {
              intervalNum[index]++;
              Request(params, item, contentIndex).then((data) => {
                if (data === 'ok') {
                  clearInterval(allInterval[index]);
                  resolve1('clearInterval');
                }
              });
              if (intervalNum[index] === 1) {
                clearInterval(allInterval[index]);
                resolve1('clearInterval');
              }
            }, 100)
          });
        });

        Promise.all(allPromise2).then(data => {
          request({
            url: 'http://www.pushplus.plus/send',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: {
              'token': '4711d293bc62407ab7578d411e25e96a',
              'topic': 'xia123456',
              'title': '美团' + params.type + ':' + params.time,
              'content': content[contentIndex]
            },
            json: true,
          }, (err, response, res) => {
            console.log(res);
            content[contentIndex] = '';
          })
        })

        setTimeout(() => {
          for (let n = 0; n < allInterval.length; n++) {
            clearInterval(allInterval[n]);
          }
        }, 5000)
      }, time * 1000);
    });
  })
}

schedule.scheduleJob('10 59 15 * * *', () => {
  test({
    couponId: 'F6CFF2A35BD94F49BDEE0CC6F7CF9FE4',
    gdPageId: '306477',
    pageId: '306004',
    instanceId: '16620226080900.11717750606071209',
    componentId: '16620226080900.11717750606071209',
    version: '1',
    utmSource: '',
    utmCampaign: '',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '30-15',
    time: '16点'
  }, 0)
})

schedule.scheduleJob('10 59 14 * * *', () => {
  test({
    couponId: '35D2E964BB334BEF9239151847DACC02',
    gdPageId: '513833',
    pageId: '516533',
    utmSource: '',
    utmCampaign: '',
    version: '1',
    instanceId: '16890429573560.08766758935246644',
    componentId: '16890429573560.08766758935246644',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '25-12',
    time: '15',
  }, 1)
})

schedule.scheduleJob('10 59 10 * * *', () => {
  test({
    couponId: '687D57731F804A2CAE1F455331F83524',
    gdPageId: '512946',
    pageId: '515613',
    utmSource: '',
    utmCampaign: '',
    version: '1',
    instanceId: '16887175844450.5464210622892272',
    componentId: '16887175844450.5464210622892272',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '25-12',
    time: '11',
  }, 2)
})

schedule.scheduleJob('10 59 10 * * *', () => {
  test({
    couponId: '419967B3A4064140BA78E6A046DF0FC1',
    gdPageId: '500039',
    pageId: '516245',
    utmSource: '',
    utmCampaign: '',
    version: '1',
    instanceId: '16890426447450.2400622600627338',
    componentId: '16890426447450.2400622600627338',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '25-12',
    time: '11点',
  }, 3)
})

schedule.scheduleJob('10 29 10 * * 3', () => {
  test({
    couponId: '00B223429B424F7A910C0D4885957E99',
    gdPageId: '379397',
    pageId: '378931',
    instanceId: '16618616100670.97030510386642830',
    componentId: '16618616100670.97030510386642830',
    version: '',
    utmSource: '',
    utmCampaign: '',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '25-13',
    time: '10.30'
  }, 4)
})

schedule.scheduleJob('10 29 17 * * 3', () => {
  test({
    couponId: '246AB38ABAE24C15BF599D4BD412ED46',
    gdPageId: '379397',
    pageId: '378931',
    instanceId: '16618616100670.97030510386642830',
    componentId: '16618616100670.97030510386642830',
    version: '',
    utmSource: '',
    utmCampaign: '',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '25-13',
    time: '17.30'
  }, 5)
})

schedule.scheduleJob('10 29 10 * * *', () => {
  test({
    couponId: '9808DF1919174B5A8671FF5F7CFB40CC',
    gdPageId: '474800',
    pageId: '475929',
    instanceId: '',
    componentId: '',
    version: '',
    utmSource: '',
    utmCampaign: '',
    yodaReady: 'h5',
    csecplatform: '4',
    csecversion: '2.0.1',
    type: '25-12',
    time: '10.30'
  }, 6)
})
// 4.  26-13 （周一、二，有效期3小时）
// 10:00
// F19640966FB6422A8B3CBE84091D10C3
// 16:00
// EB1944AA915E4C6B95901B0A27078E13

//每周一周二 15点
// schedule.scheduleJob('59 59 9 * * 1-2', ()=>{
//   //定时开启计时器
//   let myInterval = setInterval(function () {
//     intervalNum1++;
//     Request();
//     if (intervalNum1 === 30) {
//       clearInterval(myInterval);
//     }
//   }, 60);
// })
