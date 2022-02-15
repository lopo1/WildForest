<script>
	import https from './common/request.js';
	import tips from './common/t.js';
	import next from './common/router.js';
	export default {
		onLaunch: function() {

		},
		onShow: function() {},
		onHide: function() {},
		globalData: {
			client_id: '',
			publicKey: `-----BEGIN PUBLIC KEY-----
			MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDChVgDfPBWticdQvIGprJSufEw
			jnqdDNp5CZ3sxYhmo8drBp9RLbj3QivATLaUonxuOrVS6MvrNF/EeaVjUGVpIsdd
			+bpY2RVUQXnrVGKNoy7/p32N+dowWVhIIUADZRLFOUSQDIfCPWBExczSKGbvkWqN
			sOuUeE9UfElEFP4ezwIDAQAB
			-----END PUBLIC KEY-----`,
			osHeight: '667', //屏幕可用高度
			osWidth: '340', //屏幕可用宽度
			osStateH: 30, //设备状态栏高度
			comInfo: {
				circle_img: '',
				head_img: '',
				id: '',
				nickname: '',
			},
			momentsImgWidth: 0,
			currentMoment: {},
			momentsMessageCount: 0,
			chatPreTime: '',
			chatPreTimeDown: '',
			chatShowPreTime: '',
			pageLock: true,
			$get: https.get,
			$post: https.post,
			$postFormData: https.postFormData,
			$upload: https.upload,
			$tips: tips.$tips,
			$next: next.$next,
			$tab: next.$tab,
			$un: next.$un,
			$back: next.$back,
			parentData: {},
			wordKey: "",
			words: '', //用于导出助记词
			key: "", //用于私钥
			headImg: "",
			la: {}, //语言
			wgtUrl: "", //新版本下载地址
			lang: 'ch', //初始化用得语言
			codeNum: 60,
			upDataLock: true,
			timer: '', //定时器方法
			revokeApiLock: false, //用于交易列表执行撤单后返回刷新页面
			addressMsg: {},
			addressLock: false,
			goodsMsg: [], //商品详情
			shopMyOrderIndex: 0,
			isSX: false,
			//Router,用于销毁
			shopRouterGoodsMsg: {},
			shopRouterPaymentMsg: {},
			shopRouterSuccessMsg: {},
			shopRouterOrdeDetailsrMsg: {}, //订单详情
			shopMyAppealMsg: {},
			shopPage: 0,
			shopCatApiLock: false, //是否刷新购物车
			shopRouterCatLock: false, //是否通过购物车交易
			shopTransactionLock: false, //交易完成后防止路由过渡过剩
			shopRouterMyLock: false, //通过订单进入进行交易
			// addressApiLock:false,en-us
			// currentLang2:'zh-cn',
			currentLang2: 'zh-cn',
			wallteRefresh: false,
			shopNavNum: 0, //商城下标
			classLists: [],
			oldSearchValue: '',
			refName: "",
			page1: "",
			page2: "",
			page3: "",
			page4: "",
			ws: "", //推送
			client_id: "",
			payPswType: '', //是否设置了支付密码
			idTestInfo: {}, //身份验证
			myInfo: {},
			privateCount: 0,
			currentGuildInfo: {},
			redBagList: [],
			leftUpdate: false, //左抽屉更新
			guildImg: "",
			account: '',
			nft_Address: 'TLMYtqLKbsLKvqzKgDAZD5VJuseSyXXSB4', //NFT地址
			nftContract: "", //NFT合约示例
			// forest_Address:'TTWzKA9AW9TDSsxFNLhL4itFJY6qJbMnFn',//森林合約地址
			// forest_Address:'TGBLDWoJ9Bqg8BrxgdjT9fViQwZyBS1gTw',//自己部署森林合約地址
			forest_Address: 'TNq6dvLh99UwVyNdrtw9Xb4fLs6P7RZBmp', //修改森林合約地址
			forestContract: '', //森林合約實例
			forestAbi: [{
				"inputs": [{
					"internalType": "address",
					"name": "_stakeToken",
					"type": "address"
				}, {
					"internalType": "address",
					"name": "_f",
					"type": "address"
				}, {
					"internalType": "address",
					"name": "_n",
					"type": "address"
				}],
				"stateMutability": "nonpayable",
				"type": "constructor"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				}],
				"name": "BuyTree",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "address",
					"name": "superUser",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "Direct",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "DividendTake",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "address",
					"name": "inSuper",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "InDirect",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "Lottery",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}],
				"name": "NftUse",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "PoolTake",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "Stake",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "Withdraw",
				"type": "event"
			}, {
				"inputs": [],
				"name": "_community",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "_ecology",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "superUser",
					"type": "address"
				}],
				"name": "activate",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "_price",
					"type": "uint256"
				}, {
					"internalType": "string",
					"name": "_url",
					"type": "string"
				}],
				"name": "addBg",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "allBg",
				"outputs": [{
					"components": [{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					}, {
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}, {
						"internalType": "string",
						"name": "url",
						"type": "string"
					}],
					"internalType": "struct CrazyForest.BackGround[]",
					"name": "",
					"type": "tuple[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "bgOf",
				"outputs": [{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "boxOf",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}],
				"name": "buyBg",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "buyBox",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint8",
					"name": "index",
					"type": "uint8"
				}, {
					"internalType": "uint256",
					"name": "num",
					"type": "uint256"
				}],
				"name": "buyTree",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "checkPoint",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "communityTake",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "current",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "desert",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "dividend",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "dividendOf",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "dividendTake",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "ecologyTake",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "isActivate",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "lottery",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "magicTreeOf",
				"outputs": [{
					"components": [{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
					}, {
						"internalType": "uint256",
						"name": "buyTime",
						"type": "uint256"
					}, {
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}],
					"internalType": "struct CrazyForest.MagicTree[]",
					"name": "",
					"type": "tuple[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}, {
					"internalType": "address",
					"name": "",
					"type": "address"
				}, {
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}, {
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}],
				"name": "onTRC721Received",
				"outputs": [{
					"internalType": "bytes4",
					"name": "",
					"type": "bytes4"
				}],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "openBox",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}],
				"name": "openMagicTree",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "poolOf",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "poolRelease",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "poolTake",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "remainTime",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "stakeToken",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "start",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "totalContribute",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "totalDividend",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "totalLottery",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "totalPool",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}, {
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}],
				"name": "treeOf",
				"outputs": [{
					"components": [{
						"internalType": "uint8",
						"name": "index",
						"type": "uint8"
					}, {
						"internalType": "uint256",
						"name": "buyTime",
						"type": "uint256"
					}, {
						"internalType": "uint256",
						"name": "num",
						"type": "uint256"
					}],
					"internalType": "struct CrazyForest.Tree[]",
					"name": "",
					"type": "tuple[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint8",
					"name": "index",
					"type": "uint8"
				}],
				"name": "treePrice",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "userC",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "water",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "waterCountOf",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}],
			USDT_Address: "TRyK3iQF1fMMSxvBwytJfRy4eytendk5JG",
			USDTContract: "", //USDT合约
			usdtDec: "", //小数点
			accredit: '',
			onShear(number, place) {
				//裁剪
				const str = number + '';
				if (str.indexOf('.') != -1) {
					const left = str.split('.')[0];
					const right = str.split('.')[1];
					if (right.length > place) {
						const newStr = right.slice(0, place);
						return (left + '.' + newStr) * 1
					} else {
						return number;
					}
				} else {
					return number;
				}
			},
			setCodeNum() {
				const app = getApp().globalData;
				clearInterval(app.timer)
				app.timer = setInterval(() => {
					app.codeNum--;
					if (app.codeNum <= 0) {
						app.codeNum = 60;
						clearInterval(app.timer)
					};
					// console.log(app.codeNum)
				}, 1000)
			}, //发送验证码时间
			secret(val) {
				//加密
				const app = getApp().globalData;
				const Signature = require("fucking-util-signature-all");
				const rsa = new Signature.RSA();
				rsa.setPublicKey(app.publicKey);
				rsa.keys.setOptions({
					encryptionScheme: 'pkcs1'
				});
				const newVal = rsa.encrypt(val, 'base64');
				return newVal;
			},
			getSickleTime(str) {
				//时间切割
				return str.split(' ')[0];
			},
			getHideInfo(str) {
				//隐藏中间信息
				const newStr = str + '';
				return newStr.substring(0, 4) + '****' + newStr.substring(newStr.length - 4)
			}

		}
	}
</script>

<style lang="scss">
	.content {
		//内容
		width: 750rpx;
		height: 100vh;
		// background-color: pink;
		@include re();
		align-items: center;
		overflow: hidden;
	}

	.fr {
		display: flex;
		flex-direction: row;
	}

	.fc {
		display: flex;
		flex-direction: column;
	}

	.jc {
		justify-content: center;
	}

	.jb {
		justify-content: space-between;
	}

	.ac {
		align-items: center;
	}

	.box {
		display: flex;
		width: 750rpx;
		height: 100%;
		// background-color: blue;
		align-items: center;
	}

	.minbox {
		width: 750rpx;
		flex: 1;
		align-items: center;
	}

	.lev {
		width: 750rpx;
		align-items: center;
	}

	.ver {
		width: 750rpx;

	}

	.btns {
		width: 750rpx;
		height: 140rpx;
		align-items: center;
	}

	.btn {
		@include size(710rpx, 75rpx, #1890FF);
		border-radius: 10rpx;
		@include cen()
	}

	.btn-txt {
		@include font($l, white);
		@include bold();
	}

	////头部
	.content-head {
		//头部
		width: 750rpx;
		border-bottom-color: #E2E2E2;
		border-bottom-width: 1rpx;
	}

	.content-head-box {
		@include size(750rpx, 88rpx, none);
		@include re();
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.content-head-left {
		flex-direction: row;
		height: 88rpx;
		align-items: center;
		@include ab();
		left: 20rpx;
		top: 0;
	}

	.content-head-left-icon {
		@include size(50rpx, 50rpx, none);
	}

	//loading
	.loading {
		width: 750rpx;
		height: 88rpx;
		@include cen()
	}

	.loading-val {
		@include font(30rpx, #333);
		@include bold();
	}

	//上拉加载
	.lists-nonemsg {
		@include size(750rpx, 70rpx, none);
		@include cen();
	}

	.lists-nonemsg-line {
		@include size(90rpx, 5rpx, #666666);
		border-radius: 5rpx;
	}

	.lists-nonemsg-txt {
		@include font($m, #333);
		margin-left: 10rpx;
		margin-right: 10rpx;
		@include bold();
	}

	.title-view {
		@include size(100%, 100vh, none);
		background: rgba(0, 0, 0, .7);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		@include cen();

		.title {
			@include size(650rpx, 250rpx, white);
			border-radius: 10rpx;
			@include font(30rpx, #333);
			@include bold();
			@include cen();
			margin-bottom: 100rpx;
		}
	}
</style>
