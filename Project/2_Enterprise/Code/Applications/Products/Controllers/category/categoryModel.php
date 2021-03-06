<?php
require_once 'Project/ApplicationsFramework/MVC_superClasses/applicationsSuperController.php';
require_once FILE_ACCESS_CORE_CODE.'/Modules/Database/starfishDatabase.php';

class categoryModel extends applicationsSuperController
{
	public function selectParentCategories($category_type)
	{
		try
		{
			$pdo_connection = starfishDatabase::getConnection();
			$sql = "SELECT
							parent_id,
							A.*
						FROM
							product_categories	A
						";
			
			if($category_type)
			{
				$sql .= " WHERE category_type = :category_type ";
			}
	
			$pdo_statement = $pdo_connection->prepare($sql);
			
			if($category_type)
			{
				$pdo_statement->bindParam(":category_type", $category_type, PDO::PARAM_STR);
			}
			
			
			$pdo_statement->execute();
			$results 	= $pdo_statement->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_GROUP);
			$parent_ids = $results[0];
				
			return $parent_ids;
		}
		catch(PDOException $e)
		{
			echo "<pre>".$e->getMessage();
		}
	}
	
	//--------------------------------------------------------------------------------------------------
	
	public function removeProductCategory($product_category_id)
	{
		try
		{
			$pdo_connection = starfishDatabase::getConnection();
			$sql = "
					UPDATE
                        products
                    SET
                       	product_category_id = 0
                   	WHERE
                    	product_category_id = :product_category_id        
			";
		
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->bindParam(":product_category_id", $product_category_id, PDO::PARAM_INT);
			$pdo_statement->execute();
		
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
	}
	//--------------------------------------------------------------------------------------------------
	
	public function removeParentCategory($product_category_id)
	{
		try
		{
			$pdo_connection = starfishDatabase::getConnection();
			$sql = "
					UPDATE
                        product_categories
                    SET
                       	parent_id = 0
                   	WHERE
                    	product_category_id = :product_category_id        
			";
		
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->bindParam(":product_category_id", $product_category_id, PDO::PARAM_INT);
			$pdo_statement->execute();
		
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
	}
	
}