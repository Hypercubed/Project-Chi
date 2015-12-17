
export default function Inject (...injects) {
  return function (target) {
    target.$inject = injects;
  };
}
