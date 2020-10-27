//Constant Declaration
var R = 1000000007;
var M = 998244353;
var S = 200001;
var INF = 1000000000000000000;
//Library functions

function seive()
{
  var is_prime = new Array(S).fill(1);
  is_prime[0] = 0;
  is_prime[1] = 0;

  for(var i = 2; i <= S; i++)
  {
    if(is_prime[i] == 1);
    for(var j = i + i; j <= S; j += i)
    is_prime[j] = 0;
  }
  return is_prime;
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

function getDivisor(n)
{
  var res = [];

  for(var i = 1; i <= Math.sqrt(n); i++)
  {
    if(n % i === 0)
    {
      if(n / i === i)
      {
        res.push(i);
      }
    }
    else
    {
      res.push(i);
      res.push(parseInt(n / i));
    }
  }
  return res;
}

function power(x, n)
{
  if(n === 0)
  {
    return 1;
  }
  if(n % 2 === 0)
  {
    return power(x * x, n / 2);
  }
  else
  {
    return x * power(x * x, n / 2);
  }
}

function mat_multiply(a, b)
{
  var p = a.length;
  var q = b.length;
  var r = b[0].length;
  c = Array(p).fill(0).map(x => Array(r).fill(0));
  for(var i = 0; i < p; i++)
  {
    for(var  j = 0; j < r; j++)
    {
      for(var k = 0; k < q; k++)
      {
        c[i][j] += (a[i][k] * b[k][j]) % R;
      }
    }
  }
  return c;
}

function mat_power(a, n)
{
  n = parseInt(n);
  c = Array(a.length).fill(0).map(x => Array(a[0].length).fill(0));
  if(n === 0)
  {
    for(var i = 0; i < a.length; i++)
    {
      c[i][i] = 1;
    }
    return c;
  }
  if(n % 2 === 0)
  {
    return mat_power(c = mat_multiply(a, a), n / 2);
  }
  else
  {
    return mat_multiply(a, c = mat_power(c = mat_multiply(a, a), n / 2));
  }
}

function mat_add(a, b)
{
  var p = a.length;
  var q = a[0].length;
  c = Array(p).fill(0).map(x => Array(q).fill(0));
  for(var i = 0; i < p; i++)
  {
    for(var j = 0; j < q; j++)
    {
      c[i][j] = a[i][j] + b[i][j];
    }
  }
  return c;
}

function fibn(n)
{
  fib = Array(2).fill(1).map(x => Array(2).fill(1));
  fib[1][1] = 0;

  if(n === 0)
  {
    return 0;
  }
  else
  {
    var ans = mat_power(fib, n - 1);
    return ans[0][0];
  }
}

function karatsuba(x, y)
{
  var xlen = x.toString(10).length;
  var ylen = y.toString(10).length;
  var n = Math.max(xlen, ylen);

  if(n < 10)
  {
    return x*y;
  }
  n = (n / 2) + (n % 2);
  var multiplier = power(10, n);
  var b = x / multiplier;
  var a = x - b*multiplier;
  var d = y / multiplier;
  var c = y - d*n;
  var z0 = karatsuba(a, c);
  var z1 = karatsuba(a + b, c + d);
  var z2 = karatsuba(b, d);
  return (z0 + ((z1 - z0 - z2) * multiplier) + (z2*Math.pow(0, 2*n)));
}

function euclidean(a, b)
{
  if(a === 0)
  {
    x = 0;
    y = 1;
    var data = [b,x,y];
    return data;
  }
  var gcd = euclidean(b % a, a);
  gcd[1] = gcd[2] - (b / a) * gcd[1];
  gcd[2] = gcd[1];
  return gcd;
}

function diophantine(a, b, c)
{
  if (a === 0 && b === 0)
  {
    if (c == 0)
    {
      return "Infite Solutins";
    }
    else
    {
      return "Finite Solutions"
    }
  }

  var res = euclidean(a, b);
  var gcd = res[0];
  var x = res[1];
  var y = res[2];

  if (c % gcd != 0)
  {
    return "No Solution";
  }
  else
  {
    var ans = [x * (c / gcd) , y * (c / gcd)];
    return ans;
  }
}

function euler_totient(n)
{
  phi = new Array(n + 1).fill(1);
  phi[0] = 0;

  for(var i = 2; i <= n; i++)
  {
    phi[i] = i;
  }

  for(var i = 2; i <= n; i++)
  {
    if(phi[i] == i)
    {
      for(var j = i; j <= n; j += i)
      {
        phi[j] -= phi[j] / i;
      }
    }
  }
  return phi;
}

function zfunction(s)
{
  var n = s.length;
  z = new Array(n).fill(0);

  for(var i = 1, l = 0, r = 0; i < n; ++i)
   {
    if(i <= r)
    {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    while(i + z[i] < n && s[z[i]] == s[i + z[i]])
    {
      ++z[i];
    }
    if(i + z[i] - 1 > r)
    {
      l = i;
      r = i + z[i] - 1;
    }
  }
  return z;
}

function stein_gcd(a, b)
{
    if(a == 0) return b;
    if(b == 0) return a;
    var k;
    for(k = 0; ((a | b) && 1) == 0; ++k)
    {
      a >>= 1;
      b >>= 1;
    }
    while((a > 1) == 0) a >>= 1;
    do
    {
      while((b > 1) == 0) b >>= 1;
      if (a > b)
      {
        var t = a;
        a = b;
        b = t;
      }
      b = (b - a);
    } while(b != 0);
    return a << k;
}

function sigmoid(z) {
  return 1/(1+Math.exp(-z))
}

function softmax(ar) {
	return ar.map( x => Math.exp(x) / (ar.map( y => Math.exp(y))).reduce( (a,b) => a+b));
}

function tanh(x)
{
  return 2*sigmoid(2*x) - 1;
}

function relu(x){
  return Math.max(0, x);
}

function leaky_relu(x){
  if(x >= 0)
  {
    return x;
  }
  else return 0.01*x;
}

function nCrModPFermat(n, r, p)
{
  if (r == 0) return 1;
  var fac = new Array(n + 1).fill(1);
  fac[0] = 1;
  for(var i = 1; i <= n; i++) fac[i] = fac[i-1] * i % p;
  return (fac[n] * inverse_mod_q(fac[r], p) % p * inverse_mod_q(fac[n - r], p) % p) % p;
}

function PollardRho(n)
{
  if (n==1) return n;
  if (n % 2 == 0) return 2;
  var x = (Math.random()%(n-2))+2;
  var y = x;
  var c = (Math.random()%(n-1))+1;
  var d = 1;

  while (d==1)
  {
      x = (power_mod_q(x, 2, n) + c + n)%n;
      y = (power_mod_q(y, 2, n) + c + n)%n;
      y = (power_mod_q(y, 2, n) + c + n)%n;
      d = euclidean(abs(x-y), n);
      if (d==n) return PollardRho(n);
  }
  return d;
}

function onlyUnique(value, index, self) {
   return self.indexOf(value) === index;
 }

function Dixon(n)
{
    var base = [2, 3, 5, 7];
    var start = parseInt(Math.sqrt(n));
    var pairs=[];
    var len= 4;

    for(var i = start; i < n; i++)
    {
      var v=[];
      for(var j = 0; j < len; j++)
      {
        var lhs = parseInt(Math.pow(i,2))% n;
        var rhs = parseInt(Math.pow(base[j],2)) % n;

        if(lhs == rhs)
        {
          v.push(i);
          v.push(base[j]);
          pairs.push(v);
        }
      }
    }

    var newvec = [];
    len = pairs.length;

    for(var i = 0; i < len; i++){
        var factor = stein_gcd(pairs[i][0] - pairs[i][1], n);
        if(factor != 1) newvec.push(factor);
    }

    return newvec.filter(onlyUnique);
}

function Rencontres(n, m)
{
    if (n == 0 && m == 0) return 1;
    if (n == 1 && m == 0) return 0;
    if (m == 0) return (n - 1) * (Rencontres(n - 1, 0) + Rencontres(n - 2, 0));
    return nCrModPFermat(n, m, R) * Rencontres(n - m, 0);
}

function leornado(n)
{
  var dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for(var i = 2; i <= n; i++)
  {
    dp[i] = dp[i - 1] + dp[i - 2] + 1;
  }
  return dp[n];
}

module.exports.leornado = function(n)
{
  return leornado(n);
}

module.exports.Rencontres = function(n, m)
{
  return Rencontres(n, m);
}
module.exports.Dixon = function(n)
{
  return Dixon(n);
}

module.exports.PollardRho = function(n)
{
  return PollardRho(n);
}

module.exports.nCrModPFermat = function(n, r, p)
{
  return nCrModPFermat(n, r, p) ;
}

module.exports.leaky_relu = function(x)
{
  return leaky_relu(x);
}

module.exports.relu = function(x)
{
  return relu(x);
}

module.exports.tanh = function(x)
{
  return tanh(x);
}

module.exports.stein_gcd = function(a, b)
{
  return stein_gcd(a, b);
}

module.exports.zfunction = function(s)
{
  return  zfunction(s);
}

module.exports.euler_totient = function(n)
{
  return  euler_totient(n);
}

module.exports.diophantine = function(a, b, c)
{
  return diophantine(a, b, c);
}

module.exports.euclidean = function(a, b)
{
  return euclidean(a, b);
}

module.exports.karatsuba = function(x, y)
{
  return karatsuba(x, y);
}

module.exports.fibn = function(n)
{
  return fibn(n);
}

module.exports.mat_add = function(a, b)
{
  return mat_add(a, b);
}

module.exports.mat_power = function(a, b)
{
  return mat_power(a, b);
}

module.exports.mat_multiply = function(a, b)
{
  return mat_multiply(a, b);
}

module.exports.seive = function(p)
{
  return seive(p);
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

module.exports.getDivisor = function(n)
{
  return getDivisor(n);
}

module.exports.power = function(x, n)
{
  return power(x, n);
}

module.exports.sigmoid = function(z) {
  return sigmoid(z);
}

module.exports.softmax = function(ar) {
	return softmax(ar);
}
