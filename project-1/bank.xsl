<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">   
  <xsl:template match="/"> 	
    <html> 
      <body> 
        <h2>Bank Informtion</h2> 
        <table border="1"> 
          <tr bgcolor="#9acd32"> 
            <th>Id</th> 
            <th>Name</th> 
            <th>Client Details</th> 
            <th>Card Details</th> 
          </tr> 

          <xsl:for-each select="banks/branch"> 
            <tr> 
              <td><xsl:value-of select="id"/></td> 

              <td>
                <table border="1"> 
                 <tr> <th>Name</th> <td><xsl:value-of select="name"/></td> </tr>
                  <tr> <th>Street</th> <td><xsl:value-of select="street"/></td> </tr>
                  <tr> <th>City</th> <td><xsl:value-of select="city"/></td> </tr>
                  <tr> <th>Region</th> <td><xsl:value-of select="region"/></td> </tr>
                  <tr> <th>Country</th> <td><xsl:value-of select="country"/></td> </tr>
                </table>
              </td>

              <td>
                <xsl:for-each select="clients"> 
                  <table border="1"> 
                    <tr> <th>Id</th> <td><xsl:value-of select="id"/></td> </tr>
                    <tr> <th>FirstName</th> <td><xsl:value-of select="firstName"/></td></tr>
                    <tr> <th>LastName</th> <td><xsl:value-of select="lastName"/></td></tr>
                    <tr><th>Email</th> <td><xsl:value-of select="email"/></td></tr>
                    <tr><th>PhoneNumber</th> <td><xsl:value-of select="phoneNumber"/></td></tr>
                  </table>
                </xsl:for-each>   
              </td>

              <td>
                <xsl:for-each select="clients/cards"> 
                  <table border="1"> 
                    <tr> <th>CardNumber</th><td><xsl:value-of select="number"/></td> </tr>
                    <tr> <th>CardType</th> <td><xsl:value-of select="type"/></td></tr>
                    <tr> <th>CVV</th><td><xsl:value-of select="cvv"/></td></tr>
                    <tr><th>ExpireAt</th> <td><xsl:value-of select="expiresAt"/></td></tr>

                  </table>
                </xsl:for-each>   
              </td>       
			      </tr>
          </xsl:for-each> 
        </table> 
      </body> 
    </html> 
  </xsl:template>  
</xsl:stylesheet>