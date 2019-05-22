<Query Kind="SQL">
  <Connection>
    <ID>f669e396-5199-46be-8568-58489e07b55a</ID>
    <Persist>true</Persist>
    <Server>localhost\SQLEXPRESS</Server>
    <Database>UjinLocal</Database>
    <ShowServer>true</ShowServer>
  </Connection>
</Query>

DELETE FROM [PricePerMetal]
WHERE [ItemName] in ('Fixing', 'Printing')

INSERT INTO [AdditionalService] ([ServiceName], [Price])
VALUES ('Fixing', 50),
		('Printing', 300)
		
insert into [Gemstone] ([Id], [Name])
values 				(5, 'Zirconium')

insert into [GemstonePrice] ([GemstoneId], [Price])
values						(5, 55)