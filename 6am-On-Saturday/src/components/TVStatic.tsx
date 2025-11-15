import { useEffect, useRef } from 'react';

export const TVStatic = ()=>{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>(0);
    //we are using useRef because the user doesn't need to see something new when this value changes

    useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        //setting the canvas dimensions
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data; //RGBA array

        const animate = ()=>{
            //randomize pixels
            for(let i = 0; i<data.length; i+=4){
                const value = Math.random()*255;
                data[i] = value;
                data[i+1] = value;
                data[i+2] = value;
                data[i+3] = 255; //it should be fully opaque
            }

            ctx.putImageData(imageData, 0, 0);
            animationFrameId.current = requestAnimationFrame(animate);
        }

        animate();

        return ()=>{
            if(animationFrameId.current){
                cancelAnimationFrame(animationFrameId.current);
            }
        }

    }, []);

    return <canvas ref={canvasRef} />
}