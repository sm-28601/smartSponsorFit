import { useEffect, useRef } from 'react';

export default function ShaderBackground({ opacity = 40 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas!.clientWidth || 1280;
      const h = canvas!.clientHeight || 720;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
    }

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    vec3 c1 = vec3(0.706, 0.541, 0.91);
    vec3 c2 = vec3(0.788, 0.753, 0.902);
    vec3 c3 = vec3(0.663, 0.784, 1.0);
    vec3 bg = vec3(0.067, 0.067, 0.067);
    float n1 = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 + u_time * 0.3);
    float n2 = cos(uv.x * 2.0 - u_time * 0.4) * sin(uv.y * 3.5 + u_time * 0.6);
    vec3 color = mix(c1, c2, uv.x + n1 * 0.2);
    color = mix(color, c3, uv.y + n2 * 0.2);
    color = mix(bg, color, 0.4);
    vec2 grid = fract(uv * 40.0);
    float line = step(0.98, grid.x) + step(0.98, grid.y);
    color += line * 0.03;
    gl_FragColor = vec4(color, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = (gl as WebGLRenderingContext).createShader(type)!;
      (gl as WebGLRenderingContext).shaderSource(s, src);
      (gl as WebGLRenderingContext).compileShader(s);
      return s;
    }

    const prog = (gl as WebGLRenderingContext).createProgram()!;
    (gl as WebGLRenderingContext).attachShader(prog, cs((gl as WebGLRenderingContext).VERTEX_SHADER, vs));
    (gl as WebGLRenderingContext).attachShader(prog, cs((gl as WebGLRenderingContext).FRAGMENT_SHADER, fs));
    (gl as WebGLRenderingContext).linkProgram(prog);
    (gl as WebGLRenderingContext).useProgram(prog);

    const buf = (gl as WebGLRenderingContext).createBuffer()!;
    (gl as WebGLRenderingContext).bindBuffer((gl as WebGLRenderingContext).ARRAY_BUFFER, buf);
    (gl as WebGLRenderingContext).bufferData(
      (gl as WebGLRenderingContext).ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      (gl as WebGLRenderingContext).STATIC_DRAW
    );

    const pos = (gl as WebGLRenderingContext).getAttribLocation(prog, 'a_position');
    (gl as WebGLRenderingContext).enableVertexAttribArray(pos);
    (gl as WebGLRenderingContext).vertexAttribPointer(pos, 2, (gl as WebGLRenderingContext).FLOAT, false, 0, 0);

    const uTime = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_time');
    const uRes = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_resolution');

    let animId: number;
    function render(t: number) {
      syncSize();
      (gl as WebGLRenderingContext).viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) (gl as WebGLRenderingContext).uniform1f(uTime, t * 0.001);
      if (uRes) (gl as WebGLRenderingContext).uniform2f(uRes, canvas!.width, canvas!.height);
      (gl as WebGLRenderingContext).drawArrays((gl as WebGLRenderingContext).TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 w-full h-full ${opacity < 100 ? `opacity-${opacity}` : ''}`} style={{ opacity: opacity / 100 }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
