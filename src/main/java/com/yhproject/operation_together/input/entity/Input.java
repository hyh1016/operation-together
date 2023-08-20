package com.yhproject.operation_together.input.entity;

import com.yhproject.operation_together.common.entity.BaseTimeEntity;
import com.yhproject.operation_together.operation.entity.Operation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Input extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "operation_id")
    private Operation operation;

    @OneToMany(mappedBy = "input", fetch = FetchType.EAGER)
    private List<Content> contents = new ArrayList<>();

}
