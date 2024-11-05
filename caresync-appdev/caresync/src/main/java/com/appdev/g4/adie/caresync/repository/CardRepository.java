package com.appdev.g4.adie.caresync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
}
