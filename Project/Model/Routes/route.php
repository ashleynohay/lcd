<?php 
require_once FILE_ACCESS_CORE_CODE.'/Modules/Database/starfishDatabase.php';
class route
//-------------------------------------------------------------------------------------------------	
//-------------------------------------------------------------------------------------------------	
	public function __set($field, $value) { if(property_exists($this, $field)) $this->{$field} = $value; }
//-------------------------------------------------------------------------------------------------
	public function select()
			$pdo_connection = starfishDatabase::getConnection();
			$sql = "SELECT
			$pdo_statement = $pdo_connection->prepare($sql);
			$result = $pdo_statement->fetch(PDO::FETCH_ASSOC);
		}
//-------------------------------------------------------------------------------------------------
	public function ifPermalinkExists($permalink, $route_id = NULL)
			$sql = "SELECT

			$result = $pdo_statement->fetch(PDO::FETCH_ASSOC);
			$this->route_id		=	$result['route_id'];
	}
//-------------------------------------------------------------------------------------------------
	public function insert()
			$sql = "INSERT INTO
			$pdo_statement = $pdo_connection->prepare($sql);
			return $this->route_id = $pdo_connection->lastInsertId();
//-------------------------------------------------------------------------------------------------
	public function update()
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->bindParam(':permalink', $this->permalink, PDO::PARAM_STR);
//-------------------------------------------------------------------------------------------------
	public function delete()
			$sql = "DELETE FROM
			$pdo_statement = $pdo_connection->prepare($sql);
?>