<Query Kind="SQL">
  <Connection>
    <ID>f669e396-5199-46be-8568-58489e07b55a</ID>
    <Persist>true</Persist>
    <Server>localhost\SQLEXPRESS</Server>
    <Database>UjinLocal</Database>
    <ShowServer>true</ShowServer>
  </Connection>
</Query>

insert into [Gemstone] ([Id], [Name])
values					(6, 'SapphireArtifical'),
						(7, 'RubyArtifical'),
						(8, 'EmeraldArtifical');
						
GO

insert into [GemstonePrice] ([GemstoneId], [Price])
values						(6, 97),
							(7, 97),
							(8, 134);
							
GO
