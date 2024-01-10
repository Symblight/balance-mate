declare module "*.css?inline" {
  const styles: { [className: string]: string };
  export default styles;
}
