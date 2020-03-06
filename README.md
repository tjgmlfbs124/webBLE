# Windows용 WEB기반 Bluetooth(BLE) 통신 라이브러리
참고 : [링크](https://github.com/noble/noble)

관리자권한으로 PowerShell 혹은 cmd.exe로 MS의 windows-build-tools를 설치해야한다.
```
npm install --global --production windows-build-tools
```

* Bluetooth 4.0 USB Adapter 필요. (BLE Dongle)
* Node version == v8.11.3 (TEST 당시)
* npm version == v6.12.0 (TEST 당시)
* CSR Driver 필요 (첨부해놓은 CSR driver.exe)


### STEP1. webBle.js 다운로드
Node.js 프레임워크 기반으로 돌아가는 js파일이므로, 적당한 위치에 **webBLE.js** 를 다운받는다.

그 프로젝트 최상위 위치에서 PowerShell or CMD.exe를 실행하여 의존성 모듈을 설치해야한다
* Noble
* bluetooth-hci-socket
```
npm install noble
npm install bluetooth-hci-socket
```

### STEP2. 소스코드에서 빌드하기
필요한 js에서 다음과 같이 입력하여 webBLE 모듈을 가져온다.

예시
```
var webBLE = require('./webBLE');
```
콘솔로 webBLe 객체가 값을 가지고 있다면, 준비완료.


## Usage
```
var webBLE = require('./webBLE');

webBLE.startScanning(); // BLE 스캔 시작

webBLE.stopScanning(); // BLE 스캔종료

webBLE.noble.on('discover', function(peripheral){  // discover 이벤트 바인딩하는곳

});

webBLE.connect(uuid); // uuid에 맞는 BLE 모듈 연결

webBLE.write(data); // uuid와 보낼 data를 파라메타로 주면 data값을 'hex'로 치환하여 uuid의 모듈에게 전송
```


2020-03-06 @SEO
