//Constant Declaration
var R 1000000007;
var M 998244353;
var S 200001;
var INF 1000000000000000000LL

//Initialization
var is_prime = new Array(S).fill(1);
var fact = new Array(S);

fact[0] = 1;
is_prime[0] = 0;
is_prime[1] = 0;

for(var i = 1; i < S; i++)
    fact[i] = (fact[i-1] * i) % R;

for(var i = 2; i <= S; i++)
{
  if(is_prime[i] == 1);
  for(var j = i + i; j <= s; j += i)
  is_prime[j] = 0;
}

//Library functions

function check_prime(p)
{
  if(isprime[p] == 1)return true;
  else return false;
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
  var divisor = [];

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
      res.push(n / i);
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
  for(ll i = 0; i < p; i++)
  {
    for(ll j = 0; j < r; j++)
    {
      for(ll k = 0; k < q; k++)
      {
        c[i][j] += (a[i][k] * b[k][j]) % R;
      }
    }
  }
  return c;
}

function mat_power(a, n)
{
  c = Array(a.length).fill(0).map(x => Array(a.length).fill(0));
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
    return power(c = multiply(a, a), n / 2);
  }
  else
  {
    return multiply(a, c = power(c = multiply(a, a), n / 2));
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
  c = Array(2).fill(1).map(x => Array(2).fill(1));
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

function euclidean(a, b, x, y)
{
  if(a === 0)
  {
    x = 0;
    y = 1;
    return b;
  }
  var  x1, y1;
  var gcd = euclidean(b % a, a, x1, y1);
  x = y1 - (b / a) * x1;
  y = x1;
  return gcd;
}

function shift_solution(x, y, a, b, cnt)
{
  x += cnt * b;
  y -= cnt * a;
}

function diphantine(a, b, c, minx, maxx, miny, maxy)
{
  var x, y, g;
  if (!diphantine(a, b, c, x, y, g))
  {
    return 0;
  }

  a /= g;
  b /= g;
  var sign_a = a > 0 ? +1 : -1;
  var sign_b = b > 0 ? +1 : -1;

  shift_solution(x, y, a, b, (minx - x) / b);
  if (x < minx)
  {
    shift_solution(x, y, a, b, sign_b);
  }
  if (x > maxx)
  {
    return 0;
  }

  var lx1 = x;
  shift_solution(x, y, a, b, (maxx - x) / b);
  if (x > maxx)
  {
    shift_solution(x, y, a, b, -sign_b);
  }

  var rx1 = x;
  shift_solution(x, y, a, b, -(miny - y) / a);
  if (y < miny)
  {
    shift_solution(x, y, a, b, -sign_a);
  }
  if (y > maxy)
  {
    return 0;
  }

  var lx2 = x;
  shift_solution(x, y, a, b, -(maxy - y) / a);
  if (y > maxy)
  {
    shift_solution(x, y, a, b, sign_a);
  }

  var rx2 = x;
  if (lx2 > rx2)
  {
    var tmp = lx2;
    lx2 = rx2;
    rx2 = tmp;
  }

  var lx = Math.max(lx1, lx2);
  var rx = Math.min(rx1, rx2);
  if (lx > rx)
  {
    return 0;
  }
  return (rx - lx) / Math.abs(b) + 1;
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
      if (a > b) swap(a, b);
      b = (b - a);
    } while(b != 0);
    return a << k;
}

function sigmoid(z) {
  return 1/(1+Math.exp(-z))
}

module.exports.stein_gcd = function(a, b)
{
  return stein_gcd(a, b)
}

module.exports.zfunction = function(s)
{
  return  zfunction(s);
}

module.exports.euler_totient = function(n)
{
  return  euler_totient(n);
}

module.exports.diphantine = function(a, b, c, minx, maxx, miny, maxy)
{
  return diphantine(a, b, c, minx, maxx, miny, maxy);
}

module.exports.euclidean = function(a, b, x, y)
{
  return euclidean(a, b, x, y);
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
  return multiply(a, b);
}

module.exports.mat_multiply = function(a, b)
{
  return multiply(a, b);
}

module.exports.check_prime = function(p)
{
  return check_prime(p);
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

module.exports.getDivisor = function(n)
{
  return getDivisor(n);
}

module.exports.power = function(x, n)
{
  return power(x, n);
}

module.exports.sigmoid = function(z) {
  return sigmoid(z)
}
