const common = [
  '--require-module ts-node/register',
]

const backend = [
  ...common,
  'tests/features/backend/**/*.feature',
  '--require tests/features/step_definitions/**/*.steps.ts',
].join(' ');

module.exports = {
  backend
}