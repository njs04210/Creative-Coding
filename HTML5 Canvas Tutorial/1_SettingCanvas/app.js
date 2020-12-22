class App {
  constructor() {
    //생성자. App의 인스턴스 생성됐을때 해당 값으로 초기화 시켜주는 역할
    this.canvas = document.createElement('canvas');
    /*
    App 클래스의 canvas 변수. document 인터페이스는 브라우저가 불러온 웹 페이지를 나타내며
    DOM트리의 진입점 역할을 한다. document.createElement('canvas')로 페이지에 canvas라는 새로운 요소를 생성한다. 
     */
    document.body.appendChild(this.canvas);
    /*
    document.body 속성은 현재 문서의 <body> 또는 <frameset>노드를 반환한다. 
    현재 문서의 <body>의 끝에 <canvas> 요소를 붙인다.
    */
    this.ctx = this.canvas.getContext('2d');
    /*
    App클래스의 ctx 변수. canvas에 대한 2D(2차원) 렌더링 context를 갖고 있으며 이 안에 그릴 수 있게 된다.
    canvas의 2d context(렌더링될 그리기의 대상)를 얻는다.
     */
    this.piexlRatio = window.devicePixelRatio > 1 ? 2 : 1;
    /*
    window.devicPixelRatio 라는 읽기 전용 속성은 현재 표시 장치의 물리적 픽셀과 CSS 픽셀의 비율을 반환한다.
    즉 CSS 픽셀의 크기를 물리적 픽셀의 크기로 나눈 값
    */

    window.addEventListener('resize', this.resize.bind(this));
    /*
    resize 이벤트 핸들러.
    - 위 코드는 이벤트 핸들러에 resize 이벤트를 등록하는 것.
    - addEventListner : 지정한 이벤트(resize)가 대상(window)에 전달될 때마다 호출할 함수 지정.
    - this.resize.bind(this) : resize 이벤트가 발생했을 때, 알림(이벤트 리스너 인터페이스를 구현하거나
        js function을 구현하는 객체)을 받는 객체
    - bind(this) 붙여서 window같은 전역 객체를 resize 하는 착각을 안하게 하는 거임, 즉 우리의 의도대로
        App의 인스턴스를 resize하게끔 범위를 묶어놓은거다
    */
    this.resize();
    //event listen전, 처음에 resize 한번 해주는 작업

    window.requestAnimationFrame(this.animate.bind(this));
    /*
    resize 이벤트는 빈번하게 발생될 수 있기 때문에, 이벤트 핸들러는 DOM 수정과 같은 계산이 많이 필요한 연산을
    실행하지 않아야 합니다. 대신에 다음과 같이 requestAnimationFrame, setTimeout, customEvent* 등을
    사용해 이벤트를 스로틀(throttle) 하는것이 좋습니다
    브라우저에게 수행하기를 원하는 애니메이션을 알리고, 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를
    호출하게 한다. 리페인트 이전에 실행할 콜백을 인자로 받는다. 
    //계속 request하고 있음..
    */
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.piexlRatio;
    this.canvas.height = this.stageHeight * this.piexlRatio;
    this.ctx.scale(this.piexlRatio, this.piexlRatio);
    //canvas 단위를 수평으로 x만큼, 수직으로 y만큼 크기를 확대 축소.
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    /*
        ctx.clearRect(x, y, width, height)
    */
    this.ctx.fillStyle = '#cddb49';
    this.ctx.beginPath();
    this.ctx.arc(
      this.stageWidth / 2,
      this.stageHeight / 2,
      300, //반지름
      0, //start angle
      2 * Math.PI //end angle
    );
    this.ctx.fill();
    /*
        arc() => 원의 중심을 가리키는 x,y좌표 / 원의 반지름 / 원을 그릴 때 시작과 끝이 되는 각도(라디안값)
        / 그리는 방향 (기본값(false)시계방향, true면 반시계방향으로. 이 파라미터는 옵션임.)
    */
  }
}

window.onload = () => {
  /*
    자바스크립트에서 페이지가 로드 되면 자동으로 실행되는 전역 콜백함수
    페이지의 모든 요소들이 로드되어야 호출되며, 한 페이지에서 하나의 window.onload()함수만 적용
    */
  new App();
};
