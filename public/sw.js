if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>c(e,a),d={module:{uri:a},exports:t,require:r};s[a]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CryptoLogo/ADA.png",revision:"f62ea02cd4822e4d097dce3387b20ca8"},{url:"/CryptoLogo/BTC.png",revision:"42cc80cbe979ec05ea7aba418c854ea1"},{url:"/CryptoLogo/ETH.png",revision:"9498513df8236bdfc96c37e73300b4fd"},{url:"/CryptoLogo/SOL.png",revision:"f967bc15293143cc0f76f5822cde8fb8"},{url:"/CryptoLogo/XRP.png",revision:"56d83095823f598e6baf43a1f63ca95c"},{url:"/Images/3.svg",revision:"0a8a733a93ce7c814f61390dff558419"},{url:"/Images/opengl.jpg",revision:"ea0adfcb01cfcb26fe36ac0005606444"},{url:"/Images/stars.jpg",revision:"19b535e09ddef6ba2e92e45986ea8978"},{url:"/Shop/hotstar/1.png",revision:"00387c55d0fda25384ed88e869715bc3"},{url:"/Shop/hotstar/2.webp",revision:"e67a4ba24de9346c496ee5b058ed16e3"},{url:"/Shop/linkedin/1.jpg",revision:"f062759c24d599d11d6b529a9afde0c9"},{url:"/Shop/linkedin/2.jpg",revision:"863ed2236317e16b277218f5164736bd"},{url:"/Shop/linkedin/3.png",revision:"5c6e33a5d3406b4770b3821a8b5b9792"},{url:"/Shop/sonyliv/1.jpg",revision:"1aa675575da638c22240867bbcb02a93"},{url:"/Shop/sonyliv/2.jpg",revision:"6172641349c829cc903d876bcf37de3c"},{url:"/Shop/sonyliv/3.jpg",revision:"b8606539861acb87f46f456026e9e23c"},{url:"/_next/app-build-manifest.json",revision:"83f5240daaee4e63ceaf2b0f6fd71332"},{url:"/_next/static/-7AEe3KTvsvchA4YFlykv/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/-7AEe3KTvsvchA4YFlykv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0429ce87-4e72bbda69e6625b.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/056c333d.ed0d7194bb0ddabf.js",revision:"ed0d7194bb0ddabf"},{url:"/_next/static/chunks/0e5ce63c-ba82715dd3173752.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/1022.c131a50cbb6f1ccf.js",revision:"c131a50cbb6f1ccf"},{url:"/_next/static/chunks/1231-9ef67f62a1b79c0e.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/1303.2a675ce3455ba38c.js",revision:"2a675ce3455ba38c"},{url:"/_next/static/chunks/1310.aadce73fe400973c.js",revision:"aadce73fe400973c"},{url:"/_next/static/chunks/1401.702349d04ee43104.js",revision:"702349d04ee43104"},{url:"/_next/static/chunks/1407.102df16c6490bff4.js",revision:"102df16c6490bff4"},{url:"/_next/static/chunks/1447.d391ece6c6a14b3a.js",revision:"d391ece6c6a14b3a"},{url:"/_next/static/chunks/151.ae2e5b7cdb640883.js",revision:"ae2e5b7cdb640883"},{url:"/_next/static/chunks/1646-34d4d2960550e234.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/1671-afd415873f32de56.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/175-df3fef46375313cb.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/1787.6024804743dcbcd7.js",revision:"6024804743dcbcd7"},{url:"/_next/static/chunks/1889.9e8a2d92315fcb96.js",revision:"9e8a2d92315fcb96"},{url:"/_next/static/chunks/2049.3ecc117dad959c7d.js",revision:"3ecc117dad959c7d"},{url:"/_next/static/chunks/2148-27edbb990e2a67c2.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/2184.a17f1df9492d230a.js",revision:"a17f1df9492d230a"},{url:"/_next/static/chunks/2338.9b6d19c3df3003af.js",revision:"9b6d19c3df3003af"},{url:"/_next/static/chunks/2564.81da08c77a35b837.js",revision:"81da08c77a35b837"},{url:"/_next/static/chunks/2687.9b0295c11fed3ea1.js",revision:"9b0295c11fed3ea1"},{url:"/_next/static/chunks/2717.19a6e217fa25d52a.js",revision:"19a6e217fa25d52a"},{url:"/_next/static/chunks/2804-5ccf9d02498b5c4d.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/2919.7c6876574708f341.js",revision:"7c6876574708f341"},{url:"/_next/static/chunks/2945.df4e3fdd13c86882.js",revision:"df4e3fdd13c86882"},{url:"/_next/static/chunks/2e317778-80e06a5f68ec52f2.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/3025.bc43baacd2789abc.js",revision:"bc43baacd2789abc"},{url:"/_next/static/chunks/305.2b145befdaf36216.js",revision:"2b145befdaf36216"},{url:"/_next/static/chunks/3075d998.0b107d9884260db7.js",revision:"0b107d9884260db7"},{url:"/_next/static/chunks/3193-0041ddd96e9d616c.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/3250.b86427be9fe51324.js",revision:"b86427be9fe51324"},{url:"/_next/static/chunks/3297.ba200a8a25881e7c.js",revision:"ba200a8a25881e7c"},{url:"/_next/static/chunks/3361-4978dbe67e7f6c82.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/3426.222341d930679668.js",revision:"222341d930679668"},{url:"/_next/static/chunks/3537-1106e924da668e24.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/3578.7efd92253674dce8.js",revision:"7efd92253674dce8"},{url:"/_next/static/chunks/3583.087cbed6210a7514.js",revision:"087cbed6210a7514"},{url:"/_next/static/chunks/3611.0f9998db9ab306ed.js",revision:"0f9998db9ab306ed"},{url:"/_next/static/chunks/3639-b0072a500f8825c4.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/367.acb026e3e5a5dbf2.js",revision:"acb026e3e5a5dbf2"},{url:"/_next/static/chunks/393a7eec-b2d2606bb39db609.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/394.3a24eb3f6b5731aa.js",revision:"3a24eb3f6b5731aa"},{url:"/_next/static/chunks/3df6895e.6ab631c8ff703387.js",revision:"6ab631c8ff703387"},{url:"/_next/static/chunks/4119-172ad9b95ed80dbf.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/4126-57cac0173a4f353e.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/4250.b8ee1fcb57f9676a.js",revision:"b8ee1fcb57f9676a"},{url:"/_next/static/chunks/4279.448446cf5effb569.js",revision:"448446cf5effb569"},{url:"/_next/static/chunks/4295.3fbf397350392c9d.js",revision:"3fbf397350392c9d"},{url:"/_next/static/chunks/4338.244d3f348b240d19.js",revision:"244d3f348b240d19"},{url:"/_next/static/chunks/4380.77aa76537ddc14d6.js",revision:"77aa76537ddc14d6"},{url:"/_next/static/chunks/43907a00.96a8ddd71a7fe926.js",revision:"96a8ddd71a7fe926"},{url:"/_next/static/chunks/4562-65568370842edef9.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/4808.cfb78dd069ac935f.js",revision:"cfb78dd069ac935f"},{url:"/_next/static/chunks/4867.624fdb44ab0664ea.js",revision:"624fdb44ab0664ea"},{url:"/_next/static/chunks/4917-08d5f6c1cefd629a.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/4939.da3da30ebf0ec62b.js",revision:"da3da30ebf0ec62b"},{url:"/_next/static/chunks/49513e61.e385d5366cf85b05.js",revision:"e385d5366cf85b05"},{url:"/_next/static/chunks/5005.c50d9229b6923837.js",revision:"c50d9229b6923837"},{url:"/_next/static/chunks/512.70efe80b9e57f5f7.js",revision:"70efe80b9e57f5f7"},{url:"/_next/static/chunks/5259.7a024b6cf608fef3.js",revision:"7a024b6cf608fef3"},{url:"/_next/static/chunks/5311.9fe2374925688cd2.js",revision:"9fe2374925688cd2"},{url:"/_next/static/chunks/5318.75ec75ad6d3b007b.js",revision:"75ec75ad6d3b007b"},{url:"/_next/static/chunks/5491.bc29cde175198ab1.js",revision:"bc29cde175198ab1"},{url:"/_next/static/chunks/5502.83dd63874f6d48c9.js",revision:"83dd63874f6d48c9"},{url:"/_next/static/chunks/5527.6864f8ee55feee67.js",revision:"6864f8ee55feee67"},{url:"/_next/static/chunks/562.fb0cf1bd78b3964f.js",revision:"fb0cf1bd78b3964f"},{url:"/_next/static/chunks/5687.d533bfc0331331e9.js",revision:"d533bfc0331331e9"},{url:"/_next/static/chunks/5719-387d3ca4ccf09dff.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/5755.e407f225292a5855.js",revision:"e407f225292a5855"},{url:"/_next/static/chunks/5758.adcd83e704737429.js",revision:"adcd83e704737429"},{url:"/_next/static/chunks/5826.c7467fe139596ec7.js",revision:"c7467fe139596ec7"},{url:"/_next/static/chunks/5834.2137a3edb73eeeae.js",revision:"2137a3edb73eeeae"},{url:"/_next/static/chunks/5885.af411da0adf6afae.js",revision:"af411da0adf6afae"},{url:"/_next/static/chunks/5930.2b501898a2c96415.js",revision:"2b501898a2c96415"},{url:"/_next/static/chunks/5956-e45a22bb869ce54b.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/5995-b358a25c056cf9a4.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/5ab80550-fa0b77acd7765718.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/5d8c2bd2.daf32ffa4147a6d6.js",revision:"daf32ffa4147a6d6"},{url:"/_next/static/chunks/6079.3133eec71c597464.js",revision:"3133eec71c597464"},{url:"/_next/static/chunks/6080.5d74d2d022f3f41f.js",revision:"5d74d2d022f3f41f"},{url:"/_next/static/chunks/6081.d3bed734cde807ba.js",revision:"d3bed734cde807ba"},{url:"/_next/static/chunks/617a76d9.d648f4f6a79605a0.js",revision:"d648f4f6a79605a0"},{url:"/_next/static/chunks/6201.b14eadb19dd1149e.js",revision:"b14eadb19dd1149e"},{url:"/_next/static/chunks/6285.c8c6fcd876d65bf9.js",revision:"c8c6fcd876d65bf9"},{url:"/_next/static/chunks/6307.07c72905b9dc818e.js",revision:"07c72905b9dc818e"},{url:"/_next/static/chunks/6312.3c05296435470fd3.js",revision:"3c05296435470fd3"},{url:"/_next/static/chunks/6368.ac20f0c46fb26de6.js",revision:"ac20f0c46fb26de6"},{url:"/_next/static/chunks/6372.16c8edcbffc2423f.js",revision:"16c8edcbffc2423f"},{url:"/_next/static/chunks/6409-0c168ada9d984f1a.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/6482.2789c35f3109ad64.js",revision:"2789c35f3109ad64"},{url:"/_next/static/chunks/6522-4f71851dbf225ce5.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/6648-021e7a717dd85280.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/6649.5c3ba62f1b2c62fe.js",revision:"5c3ba62f1b2c62fe"},{url:"/_next/static/chunks/674.c548ffa2b9b772ff.js",revision:"c548ffa2b9b772ff"},{url:"/_next/static/chunks/6761.68a42357221bdf6f.js",revision:"68a42357221bdf6f"},{url:"/_next/static/chunks/6795-93240910d515a51b.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/6879.658048f4147dc021.js",revision:"658048f4147dc021"},{url:"/_next/static/chunks/6885.6b1206b135dea823.js",revision:"6b1206b135dea823"},{url:"/_next/static/chunks/6b309846.e190b1b114e824fa.js",revision:"e190b1b114e824fa"},{url:"/_next/static/chunks/702.e533d473daa62b03.js",revision:"e533d473daa62b03"},{url:"/_next/static/chunks/7023-02f85cf434b12cb9.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/7058.50a164f56d552878.js",revision:"50a164f56d552878"},{url:"/_next/static/chunks/7062-67f92fcdf534e16b.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/7378.b604c3bb8717aed2.js",revision:"b604c3bb8717aed2"},{url:"/_next/static/chunks/7387.34b8e79d4025fb32.js",revision:"34b8e79d4025fb32"},{url:"/_next/static/chunks/7399-fcbc6084707fe694.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/7505.3db84a9966d31b7b.js",revision:"3db84a9966d31b7b"},{url:"/_next/static/chunks/7727.06ee9dc76a5f12d5.js",revision:"06ee9dc76a5f12d5"},{url:"/_next/static/chunks/794.f3b0b0e0bf97d329.js",revision:"f3b0b0e0bf97d329"},{url:"/_next/static/chunks/7952.3ad1e7db1bbbdb32.js",revision:"3ad1e7db1bbbdb32"},{url:"/_next/static/chunks/7999.a2dffc400dc7a046.js",revision:"a2dffc400dc7a046"},{url:"/_next/static/chunks/8012d7e2-95ee055f99c62336.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/8026.8b5a72d37357be1a.js",revision:"8b5a72d37357be1a"},{url:"/_next/static/chunks/8133.e0459ebeab47a5c3.js",revision:"e0459ebeab47a5c3"},{url:"/_next/static/chunks/8163-afdb110c46907786.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/836.f62f4d399f40d1cd.js",revision:"f62f4d399f40d1cd"},{url:"/_next/static/chunks/8362.7b780df6b10643df.js",revision:"7b780df6b10643df"},{url:"/_next/static/chunks/8434.02f34f1fa106260c.js",revision:"02f34f1fa106260c"},{url:"/_next/static/chunks/8469.6562ac0ff8cd01cd.js",revision:"6562ac0ff8cd01cd"},{url:"/_next/static/chunks/8500.e684d95e9e75e1c3.js",revision:"e684d95e9e75e1c3"},{url:"/_next/static/chunks/8583-6cb5632a52aaed9c.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/8684.5422f069d0d2ca91.js",revision:"5422f069d0d2ca91"},{url:"/_next/static/chunks/8838.8a1ebf762ed08299.js",revision:"8a1ebf762ed08299"},{url:"/_next/static/chunks/891.1d629428219c93c2.js",revision:"1d629428219c93c2"},{url:"/_next/static/chunks/8935.8ae056daba4bf41f.js",revision:"8ae056daba4bf41f"},{url:"/_next/static/chunks/9083.a6865b348dbaf638.js",revision:"a6865b348dbaf638"},{url:"/_next/static/chunks/9172.1eb4f1a768443572.js",revision:"1eb4f1a768443572"},{url:"/_next/static/chunks/9218.135bbe88032d07ff.js",revision:"135bbe88032d07ff"},{url:"/_next/static/chunks/9359.a0f5b14aea02d4a1.js",revision:"a0f5b14aea02d4a1"},{url:"/_next/static/chunks/9433.9b7ce663ea3602d3.js",revision:"9b7ce663ea3602d3"},{url:"/_next/static/chunks/9441-e76da5af02f07da1.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/94ce5851.2a748bf40993672c.js",revision:"2a748bf40993672c"},{url:"/_next/static/chunks/958-1f0d07e96ba5c36c.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/9590-2591ad9f8d62c7fb.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/9594.45af0a2e1b210ebe.js",revision:"45af0a2e1b210ebe"},{url:"/_next/static/chunks/965f7cc4.5b281fd82214e04e.js",revision:"5b281fd82214e04e"},{url:"/_next/static/chunks/9819.a5e1c2804e347b71.js",revision:"a5e1c2804e347b71"},{url:"/_next/static/chunks/a832b0b4.caec88b6522a8396.js",revision:"caec88b6522a8396"},{url:"/_next/static/chunks/app/(routes)/admin/home/page-54b6656980d2069b.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/(routes)/blogdetails/%5BblogId%5D/page-2a1896a9213f7349.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/(routes)/create_nft/page-d7bb4195c534ac81.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/(routes)/earn/page-ab441608cb0f5e23.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/(routes)/mint/page-91c4ea2e5e1f7720.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/(routes)/profile/page-d6039ecc76e7d5e5.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/(routes)/shopping/page-21e7fae30fe406c2.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/_not-found/page-6be4074cb5994b2d.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/global-error-e5d6e9f2875afa9f.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/layout-d9f406c1c57dc9aa.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/app/page-20ae64c3440f79da.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/c1f3e1ab.8aef4d2c7032a1b1.js",revision:"8aef4d2c7032a1b1"},{url:"/_next/static/chunks/c21e53d2-6b57cc1f5bb7e1cc.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/f635926d.10aab77d4027d2f1.js",revision:"10aab77d4027d2f1"},{url:"/_next/static/chunks/f7e557d7-67b21834025ff2ae.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/fd9d1056-9f7f27bef3a2ce87.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/framework-56dfd39ab9a08705.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/main-21becf68e2cfdaa9.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/main-app-9006139e96f47d1e.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7e559049d37d7129.js",revision:"-7AEe3KTvsvchA4YFlykv"},{url:"/_next/static/css/75512f31e3b9a040.css",revision:"75512f31e3b9a040"},{url:"/_next/static/css/8b54669db085020c.css",revision:"8b54669db085020c"},{url:"/_next/static/css/a4d3db8251b8c7f7.css",revision:"a4d3db8251b8c7f7"},{url:"/_next/static/css/a602ad5c7aa82531.css",revision:"a602ad5c7aa82531"},{url:"/fonts/genetilis_bol.typeface.json",revision:"92a739035fbbb49fcf5b2ae3f456885d"},{url:"/img/16.png",revision:"6079f7532ffe52746758d9f28bf3bf41"},{url:"/img/21.png",revision:"5a09f8bda0462401d139f63f98f9161e"},{url:"/img/25.png",revision:"89c9a255a5caf9de1e7865f0c0de2556"},{url:"/img/5.png",revision:"9c498f292a8ce9ee51967623dd91c47e"},{url:"/img/gradient.jpg",revision:"a56fca48b5c652002e148d2b2bc13a25"},{url:"/img/gradient_dark.jpg",revision:"bdcb88df7bc24666be85d1b89a630730"},{url:"/img/logo.png",revision:"f63a64c9a07757fb68032414c85f4352"},{url:"/logo.svg",revision:"0a8a733a93ce7c814f61390dff558419"},{url:"/manifest.json",revision:"1a8b81b8190db2be7a10dba358158190"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"/stars.jpg",revision:"19b535e09ddef6ba2e92e45986ea8978"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/video/MetakulInfo.mp4",revision:"78ebe2f6d9f48d7db3504041a4b44058"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
