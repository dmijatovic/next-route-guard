declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dv4-loader-square-jelly': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'dv4-loader-ball-spin': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'dv4-loader-ball-triangle': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export enum LoaderType{
  BallSpin,
  BallTriangle,
  ClimbingDot,
  Donut,
  LineScale,
  Packman,
  SquareJelly,
  SquareSpin,
  Timer
}

export interface iAppLoaderData{
  loaderType?: LoaderType,
  message?: string,
  overlay?: boolean
}

const AppLoader:React.FC<iAppLoaderData> = ({
  loaderType=LoaderType.SquareJelly,
  message="Loading...",
  overlay=false
}):JSX.Element=>{
  // select loader based type
  switch (loaderType){
    case LoaderType.BallSpin:
      return (<dv4-loader-ball-spin>{message}</dv4-loader-ball-spin>)
    case LoaderType.BallTriangle:
        return (<dv4-loader-ball-triangle>{message}</dv4-loader-ball-triangle>)
    default:
      return (<dv4-loader-square-jelly>{message}</dv4-loader-square-jelly>)
  }
}

export default AppLoader