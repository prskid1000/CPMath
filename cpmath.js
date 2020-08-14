let fact = new Array(200001);
fact[0] = 1;
for(var i = 1; i < 200001; i++)
    fact[i] = (fact[i-1] * i) % 1000000007;

let is_prime = new Array(200001).fill(1);

is_prime[0] = 0;
is_prime[1] = 0;
for(var i = 2; i <= 200001; i++)
{
  if(is_prime[i] == 1);
  for(var j = i + i; j <= 200001; j += i)
  is_prime[j] = 0;
}

function check_prime(p)
{
  if(isprime[p] == 1)return true;
  else return false;
}

module.exports.check_prime = function(p)
{
  return check_prime(p);
}

function power_mod_q(x, n, q)
{
  if(n === 0)
      return 1;
  if(n % 2 === 0)
      return power_mod_q((x * x) % q, n / 2, q);
  else
      return (x * power_mod_q((x * x) % q, n / 2, q)) % q;
}

module.exports.power_mod_q = function(x, n, q)
{
  return power_mod_q(x,n,q);
}

function inverse_mod_q(n,q)
{
  return power_mod_q(n, q-2, q);
}

module.exports.inverse_mod_q = function(n, q)
{
  return power_mod_q(n, q-2, q);
}

module.exports.nCr_mod_q = function(n, r, q)
{
  return (((fact[n] * inverse_mod_q(fact[r], q)) % q) * inverse_mod_q(fact[n-r], q)) % q;
}
