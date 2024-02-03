import React, { useState } from 'react';

const LOGIN_LINK = 'https://leghe.fantacalcio.it/api/v1/v1_utente/login?alias_lega=login';

const YourComponent = () => {
  const [nomeLega, setNomeLega] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [dataColumn1, setDataColumn1] = useState([]);
  const [dataColumn2, setDataColumn2] = useState([]);

  const handleAccess = async () => {
    try {
      // External login function
      const response = await fetch(LOGIN_LINK, {
        method: 'PUT',
        headers: {
          "Host": "leghe.fantacalcio.it",
          'Access-Control-Allow-Origin': 'true',
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "it-IT,it;q=0.8,en-US;q=0.5,en;q=0.3",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          "app_key": "4ab27d6de1e92c810c6d4efc8607065a735b917f",
          "X-Requested-With": "XMLHttpRequest",
          "Origin": "https://leghe.fantacalcio.it",
          "DNT": "1",
          "Connection": "keep-alive",
          "Referer": "https://leghe.fantacalcio.it/login",
          // # Add any other cookies you might need
          // # "Cookie": "AWSALB=3Pf7S22PlDmW1hyJmW37CYgTUnEW8U0btaEB0MNWUBCMMQtw5Lc/5poM+1Vh4RMa7BHLsrn72s2Z4cwcNA9e/dVRE6PrROhhU1q+rQApAB/s7RlaEcW0uTkEwjG8; AWSALBCORS=3Pf7S22PlDmW1hyJmW37CYgTUnEW8U0btaEB0MNWUBCMMQtw5Lc/5poM+1Vh4RMa7BHLsrn72s2Z4cwcNA9e/dVRE6PrROhhU1q+rQApAB/s7RlaEcW0uTkEwjG8; euconsent-v2=CP5ZxQAP5ZxQAFgAGAITAhEsAP_gAEPgABCYJ1NX_H__bW9r8Xr3aft0eY1P99j77sQxBhfJE-4FyLvW_JwXx2ExNA26tqIKmRIEu3ZBIQFlHJHURVigaogVryHsYkGcgTNKJ6BkgFMRM2dYCF5vmYtj-QKY5_p9d3fx2D-t_dv83dzzz8VHn3e5fmckcICdQ58tDfn9bRKb-5IOd_78v4v09F_rk2_eTVn_tcvr7B-uft87_XU-9_ffEGoAsw0KiAPsiQkItBwigQAiCsICKBAAAACQNEBACQMCnYGAS6wkQAgRQADBACAAFGQAIAABIAEIgAkAKBAABAIBAAAAAAIBAAwMAA4ALQQCAAEB0DFMKABQLCBIzIiFMCEKBIICWygQSAoEFcIAixwIoBETBQAIAkAFYAAALFYDEEgJWJBAlhBtAAAQAIBRShUIpOjAEMCZstVOKJtGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAgAAAA.f_wACHwAAAAA; pubtech-cmp-pcstring=0-XXX",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "TE": "trailers",
      },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Invalid credentials'); // Replace with your error message or custom validation
      }

      const sessionData = await response.json();

      // Clear form fields
      setNomeLega('');
      setUsername('');
      setPassword('');
      setError(null);

      // Set data for columns
      setDataColumn1(sessionData.column1); // Replace with actual data from the response
      setDataColumn2(sessionData.column2); // Replace with actual data from the response
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form>
        <label>
          Nome lega:
          <input type="text" value={nomeLega} onChange={(e) => setNomeLega(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAccess}>
          Access
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {dataColumn1.length > 0 && dataColumn2.length > 0 && (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h2>Data Column 1</h2>
            <ul>
              {dataColumn1.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h2>Data Column 2</h2>
            <ul>
              {dataColumn2.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
