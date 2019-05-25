<Query Kind="SQL">
  <Connection>
    <ID>f669e396-5199-46be-8568-58489e07b55a</ID>
    <Persist>true</Persist>
    <Server>localhost\SQLEXPRESS</Server>
    <Database>Ujin_2</Database>
    <ShowServer>true</ShowServer>
  </Connection>
</Query>

INSERT INTO AdminUsers ([DateCreated], [FirstName], [Username], [Password])
VALUES (GETDATE(), 'Administrator', 'ujin_admin', 'YAT6803Z6MTS57MQ')