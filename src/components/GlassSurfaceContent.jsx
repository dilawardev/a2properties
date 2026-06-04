export default function GlassSurfaceContent({children, ...props}){
    return (
      <div className="w-full h-full flex items-center justify-center rounded-[inherit] relative z-10" {...props}>
        {children}
      </div>
    );
}