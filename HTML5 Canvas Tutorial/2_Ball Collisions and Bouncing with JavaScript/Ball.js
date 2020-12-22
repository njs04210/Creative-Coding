export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = radius * 2; //지름
    this.x = Math.random() * stageWidth - diameter + radius;
    this.y = Math.random() * stageHeight - diameter + radius;
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx; //this.vx, this.vy가 계속 변해서 좌표값이 매 프레임마다 변하는 것임. 초기 this.x, this.y는 픽스고 vx, vy때문에 계속 변하는거.
    this.y += this.vy;

    this.bounceBlock(block);

    this.bounceWindow(stageWidth, stageHeight);
    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    //부딪혔을때 방향 바꿈
    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceBlock(block) {
    const minX = block.x - this.radius; // 공이 블록에 부딪힐때의 공의 좌표 중 가장 작은 x값
    const maxX = block.maxX + this.radius; // 공이 블록에 부딪힐때의 공의 좌표 중 가장 큰 x값
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      // 부딪힐때의 상황
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2); //블록의 왼쪽 옆면인지 오른쪽 옆면인지 정해짐
      const min2 = Math.min(y1, y2); //블록의 위쪽면인지 아래쪽면인지 정해짐
      const min = Math.min(min1, min2); // 옆면(사이드)에 부딪친건지 위아래에 부딪친건지 구별할 수 있음

      if (min == min1) {
        //옆면. minX나 maxX에 가까운 경우.
        this.vx *= -1; //옆으로 이동
        this.x += this.vx;
      } else if (min == min2) {
        //위아래. minY나 maxY에 더 가까운 경우
        this.vy *= -1; //위아래로 이동
        this.y += this.vy;
      }
    }
  }
}
